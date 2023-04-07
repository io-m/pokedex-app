import { hashPassword } from "../../utils/hash"
import prisma from "../../utils/prisma"
import { CreateUserInput } from "./schema"

export const createUser = async(input: CreateUserInput) => {
    const { password, ...rest } = input
    const { hash, salt } = hashPassword(password)
    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash }
    })
    return user
}

export const findUserByEmail = async(email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export const findUsers = async() => {
    return prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    })
}

export const upsertUserLike = async(id: number, pokemon_id: number): Promise<number> => {
   const { id: userId } = await prisma.user.update({
    where: {
        id
    },
    data: {
        pokemonLikes: {
            push: pokemon_id
        }
    }
   })
return userId
}