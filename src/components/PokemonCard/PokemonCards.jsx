import React, { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../../services/GetApiPokemon.jsx';

export const PokemonCards = ({ style }) => {
   const LIMIT = 10;
   const [pokemons, setPokemons] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selected, setSelected] = useState(null);
   const [nextUrl, setNextUrl] = useState(null);

   const getIdFromUrl = (url) => {''
      const match = url?.match(/\/pokemon\/(\d+)\/$/);
      return match ? match[1] : null;
   }

   const fetchList = async (url = null, append = false) => {
      setLoading(true);
      setError(null);
      try {
         const { results, next } = await fetchPokemonList(url, LIMIT)
         setNextUrl(next);
         if (append) {
            setPokemons(prev => [...prev, ...results]);
         } else {
            setPokemons(results);
         }
      } catch (err) {
         setError(err.message || 'Erro ao carregar os pokémons');
      } finally {
         setLoading(false);   
      }
   }

   useEffect (() => {
      fetchList();
   }, []);

   const loadMore = () => {
      if(!nextUrl) return;
      fetchList(nextUrl, true);
   }

   const fetchDetails = async (url) => {
      setLoading(true);
      setError(null);
      try {
         const details = await fetchPokemonDetails(url);
         setSelected(details);
      } catch (err) {
         setError(err.message || 'Erro ao carregar os detalhes do pokémon');
      } finally {
         setLoading(false);
      }
   }

   return (
      <>
         <div className={style.container}>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul className={style.list}>
               {pokemons.map(p => {
                  const id = getIdFromUrl(p.url);
                  const sprite = id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : null;
                  return (
                     <li key={p.name} className={style.listItems}>
                        {sprite && <img className={style.imgs} src={sprite} alt={p.name} />}
                        <span style={{ marginRight: 8 }}>{p.name}</span>
                        <button onClick={() => fetchDetails(p.url)}>Ver detalhes</button>
                     </li>
                  );
               })}
            </ul>

            {nextUrl && (
               <div>
                  <button className={style.btnLoadMore} onClick={loadMore} disabled={loading}>Carregar mais</button>
               </div>
            )}

            {selected && (
               <div className={style.details} >
                  <h2 style={{color : 'red'}}>{selected.name}</h2>
                  {selected.sprite && <img src={selected.sprite} alt={selected.name} />}
                  <p>Tipos: {selected.types.join(', ')}</p>
               </div>
            )}
         </div>
      </>
   )
}
