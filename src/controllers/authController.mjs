import  axios  from "axios";
import { jwtDecode } from "jwt-decode";
import jwt from 'jsonwebtoken'
import { configGoogle } from "../config/configGoogle.mjs";
import { configApp } from "../config/configApp.mjs";

export const authController = {

    loginGoogle: async (req, res) => {
        const { code } = req.body; // Código recibido desde el frontend
        console.log(code);
            
        try {
            // Intercambiar el código de autorización por un token
            const response = await axios.post('https://oauth2.googleapis.com/token', {
            code: code,
            client_id: configGoogle.client_id,
            client_secret: configGoogle.client_secret,
            redirect_uri: configGoogle.redirect_uri,
            grant_type: configGoogle.grant_type,
            });

            console.log(response.data);
            
            // Decodifico el id_token
            const payload = jwtDecode(response.data.id_token)

            //Respuesta 
            res.json({data: {
                    token:`${response.data.token_type} ${response.data.access_token}`,
                    name: payload.name,
                    email: payload.email,
                    picture: payload.picture
                }});
        } catch (error) {
            console.error('Error al obtener el token:', error.response.data);
            res.status(400).send('Error al obtener el token');
        }
    },
    loginApp: async (req, res) => {
        const { username, password } = req.body;    
        console.log(username);
        
        //Validar las credenciales en el modelo

        //Generación del token
        try {
            const token = jwt.sign({username}, configApp.jwt_secret, configApp.config);

            //Respuesta 
            res.json({data: {
                    token:`Bearer ${token}`,
                    name: username,
                }});
        } catch (error) {
            console.error('Error al crear el token:', error);
            res.status(400).send('Error al crear el token');
        }
    }
}