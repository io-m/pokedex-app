import { z } from "zod";
import { buildJsonSchemas } from 'fastify-zod'

const getPokemonsQuery = z.object({
    limit: z.string(),
    offset: z.string(),
})

export type PokemonQueryParam = z.infer<typeof getPokemonsQuery>
export const {schemas: pokemonSchemas, $ref} = buildJsonSchemas({
    getPokemonsQuery
})