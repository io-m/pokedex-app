
import React from 'react'
import Image from 'next/image'
import { Pokemon } from '../pages'

interface PokemonProps {
    pokemon: Pokemon
    property?: string
}

const PokemonCard = ({ pokemon }: PokemonProps) => {
  return (
    // For some reason justify-content does not push See details and Delete buttons all the way down, hence I put mt-10 on them ¯\_(ツ)_/¯
    <div className='flex-col mx-auto h-[450px] bg-[#FFF] rounded-2xl py-5 px-8 shadow-lg hover:shadow-slate-500/40'>
        <Image src={pokemon.image} alt={pokemon.name} width={200} height={200}/>
        <div className='divide-y divide-solid mb-2'>
            <h3 className='text-center font-semibold'> { pokemon.name.toUpperCase() } </h3>
            <CardDetails property='Height' pokemon={pokemon} />
        </div>
        <div className='flex justify-between mt-10'>
            <h4 className='text-blue-400 cursor-pointer'>See details</h4>
            <h4 className='text-red-400 cursor-pointer'>Delete</h4>
        </div>
    </div>
  )
}

const CardDetails = ({ pokemon }: PokemonProps) => {
    return (
        <div className='flex-col my-2'>
            {
                ['Height', 'Weight', 'Abilities'].map((property, idx) => <DetailLane key={idx} property={property} pokemon={ pokemon }/>)
            }
        </div>
    )
}

const DetailLane = ({ property, pokemon }: PokemonProps) => {
    const getPropertyKey = () => {
        switch(property) {
            case 'Height':
                return <div className='text-end text-gray-500 font-light'>{pokemon.height}</div>
            case 'Weight':
                return <div className='text-end text-gray-500 font-light'>{pokemon.weight}</div>
            case 'Abilities':
                return pokemon.abilities.map((ability, idx) => <div className='text-end text-gray-500 font-light' key={idx}>{ability}</div>)
        }
    }
    return (
        <div className='flex justify-between mt-2'>
            <div>{ property }</div>
            <div className='flex-col'>{ getPropertyKey() }</div>
        </div>
    )
}


export default PokemonCard