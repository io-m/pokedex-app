import { FastifyReply, FastifyRequest } from "fastify";
import { PokemonQueryParam } from "./schema";
import { fetchPokemonById, fetchPokemons } from "./service";

export const getPokemonsHandler = async(request: FastifyRequest<{
    Querystring: PokemonQueryParam
}>, reply: FastifyReply) => {
    try {
        const { limit, offset } = request.query
        
        const pokemons = await fetchPokemons({
            limit,
            offset
        })
    
        return reply.code(200).send({
            data: pokemons
        })
    } catch (error) {
        return reply.code(500).send({
            message: "Something went wrong"
        })
    }
}

export const getPokemonById = async(request: FastifyRequest<{
    Params: {
        id: string
    }
}>, reply: FastifyReply) => {
    try {
        const { id } = request.params

        const pokemon = await fetchPokemonById(id)
    
        return reply.code(200).send({
            data: pokemon
        })
    } catch (error) {
        return reply.code(500).send({
            message: "Something went wrong"
        })
    }
}
