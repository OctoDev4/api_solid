import { FastifyInstance } from "fastify";
import { register } from "./register";

import {Profile} from "@/http/controllers/users/profile";
import {verifyJWT} from "@/http/middlewares/verify-jwt";
import {refresh} from "@/http/controllers/users/refresh";
import {AuthenticateRoute} from "@/http/controllers/users/authenticate";



export async function usersRoutes(app:FastifyInstance){
  app.post('/user', register)

  app.post('/login', AuthenticateRoute)

  app.patch('/token/refresh',refresh)

  /* authenticated */
  app.get('/me',{onRequest:[verifyJWT]}, Profile)
}