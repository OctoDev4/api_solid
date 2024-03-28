import { FastifyInstance } from "fastify";
import { register } from "./register";
import {AuthenticateRoute} from "@/http/controllers/users/authenticate";
import {Profile} from "@/http/controllers/users/profile";
import {verifyJWT} from "@/http/middlewares/verify-jwt";


export async function usersRoutes(app:FastifyInstance){
  app.post('/user', register)

  app.post('/login', AuthenticateRoute)


  /* authenticated */
  app.get('/me',{onRequest:[verifyJWT]}, Profile)
}