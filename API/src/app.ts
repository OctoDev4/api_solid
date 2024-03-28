import fastify from "fastify";

import {ZodError} from "zod";
import {env} from "@/env";
import {fastifyJwt} from "@fastify/jwt";
import {usersRoutes} from "@/http/controllers/users/routes";
import {gymsRoutes} from "@/http/controllers/gyms/routes";

export const app = fastify()
app.register(usersRoutes)
app.register(gymsRoutes)

app.register(fastifyJwt,{
    secret:env.JWT_SECRET
})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {

        return reply.status(400).send
        ({message: 'validation error', error: error.format()})
    }


    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({message: 'internal server error'})

})

