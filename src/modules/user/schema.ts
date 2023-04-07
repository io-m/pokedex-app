import { z } from "zod";
import { buildJsonSchemas } from 'fastify-zod'

const baseUserSchema = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email(),
    name: z.string(),
}

const createUserSchema = z.object({
    ...baseUserSchema,
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
})

const createUserResponseSchema = z.object({
    id: z.number(),
    ...baseUserSchema
})

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
})

const loginResponseSchema = z.object({
    accessToken: z.string()
})

const getPokemonsQuery = z.object({
    limit: z.string(),
    offset: z.string(),
})



export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginSchema>

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    getPokemonsQuery
})