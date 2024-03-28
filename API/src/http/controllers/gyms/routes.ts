import { FastifyInstance } from "fastify";
import {verifyJWT} from "@/http/middlewares/verify-jwt";
import {searchGym} from "@/http/controllers/gyms/search-gym";
import {searchGymsNearby} from "@/http/controllers/gyms/search-gym-nearby";
import {createGym} from "@/http/controllers/gyms/create-gym";



export async function gymsRoutes(app:FastifyInstance){

    app.addHook('onRequest',verifyJWT)


    app.get('/gyms/search',searchGym)

    app.get('/gyms/search/nearby',searchGymsNearby)

    app.post('/gyms/create',createGym)
}