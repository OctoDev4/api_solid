import request from  'supertest'
import { app } from '@/app'
import {afterAll, beforeAll, describe, expect, it} from "vitest";


describe('Profile (e2e)', () => {

    beforeAll(async ()=> {
        await app.ready()
    })

    afterAll( async () => {
        await app.close()
    })


    it('should be able to get an user profile', async () => {
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

        const profileResponse = await request(app.server)
              .get('/me').set('Authorization', `Bearer ${token}`).send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'joedoe@gmail.com',
        }))

    })
})

