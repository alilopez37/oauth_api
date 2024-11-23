import dotenv from 'dotenv/config'

export const configGoogle = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: process.env.GRANT_TYPE,
}