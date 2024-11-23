import dotenv from 'dotenv/config'

export const configApp = {
    jwt_secret: process.env.JWT_SECRET,
    config : {
        expiresIn: 60 * 60,
    }
}