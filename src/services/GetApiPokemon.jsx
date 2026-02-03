import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const fetchPokemonList = async ( url = null, limit = 10) => {
   const endPoint = url ?? `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
   const res = await axios.get(endPoint);
   return {
     results: res.data.results,
     next: res.data.next
   }
}

export const fetchPokemonDetails = async (url) => {
   const res = await axios.get(url);
   return {
      name: res.data.name,
      sprite: res.data.sprites?.front_default,
      types: res.data.types?.map(t => t.type.name ?? [])
   }
}
