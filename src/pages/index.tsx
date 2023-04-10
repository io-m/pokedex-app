import { useEffect } from 'react'
import { Layout } from '../components/Layout'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import PokemonCard from '../components/PokemonCard'
import PokemonApp from '../components/App'
import { AuthProvider } from '../contexts/AuthContext'

export interface Pokemon {
  abilities: string[];
  height: number;
  id: number;
  image: string;
  name: string;
  weight: number;
}

interface PokemonProps {
  data: Pokemon[];
  error?: unknown
}

export default function Home({ data }:PokemonProps) {
  return (
    <AuthProvider>
      <Layout title='Pokemon app'>
        <Navbar />
        <PokemonApp data={data}/>
      </Layout>
    </AuthProvider>
  )
}


export const getStaticProps = async () => {
  const baseUrl = 'http://127.0.0.1:3001/api/pokemons?limit=20&offset=0'
  try {
    const response = await fetch(baseUrl)
    const {data}: PokemonProps = await response.json()
    return {
      props: {
        data
      }
    }
  } catch (error) {
    return {
      props: {
        data: [],
        error
      }
    }
  }
}