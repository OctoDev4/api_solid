import {FastifyInstance} from "fastify";
import {verifyJWT} from "@/http/middlewares/verify-jwt";
import {createCheckIn} from "@/http/controllers/check-ins/create-check-in";
import {validateCheckIn} from "@/http/controllers/check-ins/validate-check-in";
import {history} from "@/http/controllers/check-ins/history";
import {metrics} from "@/http/controllers/check-ins/metrics";
import {verifyUserRole} from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app:FastifyInstance){
    app.addHook('onRequest',verifyJWT)

    app.post('/gyms/:gymId/check-ins',createCheckIn)

    app.get('/check-ins/metrics', metrics)
    app.get('/check-ins/history',history)

    app.patch('/check-ins/:checkInId/validate',{onRequest:[verifyUserRole('ADM')]},validateCheckIn)
}