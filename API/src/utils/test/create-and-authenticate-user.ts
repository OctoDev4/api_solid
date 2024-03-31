import request from "supertest";

import {FastifyInstance} from "fastify";

export async function createAndAuthenticateUser(app:FastifyInstance){
    await request(app.server).post('/user').send
    ({
        name: 'John Doe',
        email: 'joedoe@gmail.com',
        password: 'password'
    })

    const authResponse = await request(app.server).post('/login').send({
        email: 'joedoe@gmail.com',
        password: 'password'
    })
    const {token} = authResponse.body

    return {
        token,
    }
}