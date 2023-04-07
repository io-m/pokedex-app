import { FastifyInstance } from "fastify"
import { createUserHandler, getUsersHandler, likePokemon, loginHandler } from "./handler"
import { $ref } from "./schema"

const userRoutes = async(server: FastifyInstance) => {
    server.post('/', {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, createUserHandler)

    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler)

    server.get("/", {
        preHandler: [server.auth]
    }, getUsersHandler)

    server.post('/like/:pokemon_id', {
        preHandler: [server.auth],
        schema: {
            params: {
                pokemon_id: { type: 'string' },
            },
        }
    }, likePokemon)
}

export default userRoutes