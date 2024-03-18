import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import {AuthenticateRoute} from "@/http/controllers/authenticate";


export async function appRoutes(app:FastifyInstance){
  app.post('/user', register)

  app.post('/login', AuthenticateRoute)
}