'use client'

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Pokemon } from "@/util/types";

const PokemonPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get('key');

  const [pokemon, setPokemon] = useState<Pokemon>();

  const getPokemon = () => {
    fetch('https://graphqlpokemon.favware.tech/v8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          {
            getPokemon(pokemon: ${key}) {
              key
              types {
                name
              }
            }
          }
        `
      })
    })
    .then((res) => res.json())
    .then((json) => json.data.getPokemon)
    .then((data) => setPokemon(data))
  }

  useEffect(() => {
    getPokemon();
  }, [])

  return (
    <div className={styles.pokemonPage}>
      <button onClick={() => router.push("/search")} className={styles.backToSearch}>
        <svg viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

        Back to search
      </button>
      
      <h1>{key}</h1>

      <p>{pokemon?.key}</p>
      {pokemon?.types.map((type) => (
        <p key={type.name}>{type.name}</p>
      ))}
    </div>
  )
}

export default PokemonPage