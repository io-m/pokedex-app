import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers, upsertUserLike } from "./service";
import { CreateUserInput, LoginUserInput } from "./schema";
import { getUserFromToken, verifyPassword } from "../../utils/hash";
import { server } from "../../app";

export const createUserHandler = async(request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply) => {
    const body = request.body
    try {
        const user = await createUser(body)
        return reply.code(201).send(user)
    } catch (error) {
        console.log("ERROR in HANDLER: ", error)
        return reply.code(500)
    }
}

export const loginHandler =async (request: FastifyRequest<{
    Body: LoginUserInput
}>, reply: FastifyReply) => {
    const { email, password: passwordReceived } = request.body

    // First find user by email
    const maybeUser = await findUserByEmail(email)
    if(!maybeUser) {
        return reply.code(401).send({
            message: "Invalid credentials"
        })
    }
    // Verify password
    const isCorrectPassword = verifyPassword(passwordReceived, maybeUser.salt, maybeUser.password)

    if(!isCorrectPassword) {
        return reply.code(401).send({
            message: "Invalid credentials"
        })
    }

    // Generate access token

    const { password, salt, ...rest } = maybeUser

    return {
        accessToken: server.jwt.sign({email: rest.email, id: rest.id, name: rest.name})
    }
}

export const getUsersHandler = async() => {
    const users = await findUsers()
    return users
}


export const likePokemon = async(request: FastifyRequest<{
    Headers: {
        authorization: string
    }
    Params: {
        pokemon_id: string
    }
}>, reply: FastifyReply) => {
    try {
        const { pokemon_id } = request.params
        const { authorization } = request.headers
        // console.log('HEADERS --> ', request.headers)
        
        const userData = getUserFromToken(authorization)
        if(!userData) {
            return reply.code(401).send({
                message: 'You are unauthorized'
            })
        }
        
        const userId = await upsertUserLike(userData.id, Number(pokemon_id))
        
        return reply.code(200).send({
            data: userId
        })
    } catch (error) {
        return reply.code(500).send({
            message: "Something went wrong"
        })
    }
}