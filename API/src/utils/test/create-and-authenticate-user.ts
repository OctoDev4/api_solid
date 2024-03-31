import request from "supertest";

import {FastifyInstance} from "fastify";
import {prisma} from "@/lib/prisma";
import {hash} from "bcryptjs";

export async function createAndAuthenticateUser(app:FastifyInstance,isAdm?:  false){

    const user  = await prisma.user.create({
        data:{
            name:'joedoe',
            email: 'joedoe@gmail.com',
            password_hash: await hash('password',6),
            role:isAdm ?'ADM' : 'MEMBER'
        }
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