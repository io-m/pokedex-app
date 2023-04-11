import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/route";
import { userSchemas } from "./modules/user/schema";
import fjwt from 'fastify-jwt-deprecated';
import pokemonRoutes from "./modules/pokemon/route";
import cors from '@fastify/cors'

export const server = Fastify()

declare module "fastify" {
    export interface FastifyInstance {
        auth: any
    }
}

server.register(cors, { 
   origin: "*" // super bad in production
  })

server.register(fjwt, {
    secret: `${process.env.SECRET}`
})

// Auth middleware
server.decorate("auth", async(request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (error) {
        return reply.send(error)
    }
})

server.get('/health', async(req, res) => {
    return {
        status: "OK"
    }
})

const main = async () => {
    for(const schema of userSchemas) {
        server.addSchema(schema)
    }
    server.register(pokemonRoutes, { prefix: 'api/pokemons' })
    server.register(userRoutes, { prefix: 'api/users' })
    try {
        await server.listen({port: 3001, host: '0.0.0.0'})
        server.log.info('Server ready on port localhost:3001')
    } catch (error) {
        server.log.error(error)
        process.exit(1)
    }
}

main()