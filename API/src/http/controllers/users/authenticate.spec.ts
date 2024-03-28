import request from  'supertest'
import { app } from '@/app'
import {afterAll, beforeAll, describe, expect, it} from "vitest";


describe('Authenticate (e2e)', () => {

    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll( async () => {
        await app.close()
    })


    it('should be able to authenticate', async () => {
        await request(app.server).post('/user').send
        ({
            name: 'John Doe',
            email: 'joedoe@gmail.com',
            password: 'password'
        })

        const response = await request(app.server).post('/login').send({
            email: 'joedoe@gmail.com',
            password: 'password'
        })

        expect(response.status).toEqual(200)

        expect(response.body).toEqual({
            token: expect.any(String),
            message: 'user logged in successfully'
        })

    })
})

