import React, { useEffect, useState } from 'react'
import { Pokemon } from '../pages'
import PokemonCardGrid from './PokemonCardGrid'
import Pagination from './Pagination'

interface PokemonProps {
  data: Pokemon[];
}

const PokemonApp = ({ data }:PokemonProps) => {
  const [pokemonsLength, setPokemonsLength] = useState(10)
  useEffect(() => {
    setPokemonsLength(data.length)
  }, [])
  return (
    <div className='mx-auto w-[75%]'>
      <Pagination dataLength={pokemonsLength} />
      <PokemonCardGrid data={data} />
      <Pagination dataLength={pokemonsLength} />
    </div>
  )
}

export default PokemonApp