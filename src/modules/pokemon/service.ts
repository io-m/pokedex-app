import axios from "axios";
import { PokemonResponse } from "../../utils/types";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

export const fetchPokemons = async({ limit, offset }: {
    limit: string;
    offset: string;
}) => {
    // Make API call
    const queue = []
    const properLimit = Number(limit)
    const properOffset = Number(offset) === 0 ? 1 : Number(offset)
    // We gather all API calls into queue and fire them off in parallel fashion with Promise.all
    for(let i = properOffset; i <= properLimit + properOffset - 1; i++){
        queue.push(axios(`${baseUrl}/${i}`).then((res) => res.data))
    }
    const pokemons = Promise.all(queue).then((results) => {
        return results.map(( { id, name, height, weight, abilities }: PokemonResponse) => {
            const formatImageIndex = ("00" + id).slice(-3)
            const imageLink = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatImageIndex}.png`
            return {
                id,
                name,
                height,
                weight,
                abilities: abilities.map(({ability}) => ability.name),
                image: imageLink,
            }
        })
    })
    return pokemons
}

export const fetchPokemonById = async(id: string): Promise<PokemonResponse> => {
    const unparsedPokemon = await axios.get<PokemonResponse>(`${baseUrl}/${id}`)
    const pokemon: PokemonResponse = unparsedPokemon.data
    return pokemon
}
