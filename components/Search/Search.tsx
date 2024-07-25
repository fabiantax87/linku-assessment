'use client'
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import Link from "next/link";
import { Pokemon } from "@/util/types";

const Search = () => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>();
  const [searchInput, setSearchInput] = useState<string>();

  const getAllPokemon = (name: string) => {
    // All pokemon are fetched due to the getAllPokemon query not allowing filtering.
    fetch('https://graphqlpokemon.favware.tech/v8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          {
            getAllPokemon(offset: 89) {
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
      .then((json) => json.data.getAllPokemon)
      .then((data: any[]) => {
        const filteredResults = data.filter((pokemon: Pokemon) => pokemon.key.includes(name.toLocaleLowerCase()));
        const slicedResults = filteredResults.slice(0, 10);
        setSearchResults(slicedResults);
      });
  }

  useEffect(() => {
    if(searchInput && searchInput !== "") {
      getAllPokemon(searchInput);
    }
  }, [searchInput]);

  return (
    <div className={styles.search}>
      <input 
        className={styles.searchInput}
        placeholder="Search..." 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)} 
      />

      <div className={styles.searchResults}>
        {searchResults && searchResults.map((pokemon: Pokemon) => (
          <Link key={pokemon.key} href={`/pokemon?key=${pokemon.key}`}>{pokemon.key}</Link>
        ))}
      </div>
    </div>
  )
}

export default Search