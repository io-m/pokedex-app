import crypto from 'crypto'
import { server } from "../app";

export const hashPassword = (passwordReceived: string) => {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(passwordReceived, salt, 1000, 64, "sha512").toString("hex")

    return{ hash, salt }
}

export const verifyPassword = (passwordReceived: string, salt: string, hash: string) => {
    const verifyHash = crypto.pbkdf2Sync(passwordReceived, salt, 1000, 64, "sha512").toString("hex")

    return verifyHash === hash
}

export const getUserFromToken = (bearerToken: string) => {
    const token = bearerToken.split(' ')[1]
    return server.jwt.decode<{
        email: string,
        id: number,
        name: string,
        iat: number
      }>(token)
}