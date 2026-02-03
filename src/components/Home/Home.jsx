import React from 'react'
import style from './Home.module.css'
import { PokemonCards } from '../PokemonCard/PokemonCards'

const Home = () => {
  return (
    <>
      <h1 className={style.title}>Pokémons</h1>
      <div className={style.cards}>
        <PokemonCards style={style} />
      </div>
    </>
  )
}

export default Home
