import { FastifyInstance } from "fastify"
import { $ref } from "./schema"
import { getPokemonById, getPokemonsHandler } from "./handler"



const pokemonRoutes = async(server: FastifyInstance) => {
    server.get('/', {
        schema: {
            querystring: $ref('getPokemonsQuery')
        }
    }, getPokemonsHandler)

    server.get('/:id', {
        preHandler: [server.auth],
        schema: {
            params: {
                id: { type: 'number' },
            },
        }
    }, getPokemonById)
}

export default pokemonRoutes