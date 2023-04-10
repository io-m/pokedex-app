import React, { useContext } from 'react'
import PokemonCard from './PokemonCard'
import { Pokemon } from '../pages';
import AuthContext, { AUTH_STATE } from '../contexts/AuthContext';
import LoginForm from './LoginForm';

interface PokemonGridProps {
  data: Pokemon[];
}

const PokemonCardGrid = ({data}: PokemonGridProps) => {
  const { closeShowingForm } = useContext(AuthContext)
  
  return (
    <div>
      <LoginForm /> 
      <LoadingSpinner />
      <div onClick={closeShowingForm} className='grid grid-cols-4 gap-10'>
        { 
          data.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          )) 
        }  
      </div>
    </div>
  )
}


const LoadingSpinner = () => {
  const { authState } = useContext(AuthContext)
  if(authState === AUTH_STATE.PENDING) {
    return (
      <div className='fixed fix bg-[#454545]/80 flex justify-center top-[70px] right-0 left-0 bottom-0 w-[100%] h-[1000%]'>
        <div className="animate-spin bg-gradient-to-r from-cyan-500 to-blue-500 mt-[250px] rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
    }
  return <></>
};

export default PokemonCardGrid