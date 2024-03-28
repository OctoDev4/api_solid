import {FastifyReply, FastifyRequest} from "fastify";
import {z} from "zod";
import {makeCreateGymUseCase} from "@/use-cases/factories/make-create-gym-use-case";
import {makeSearchGymsUseCase} from "@/use-cases/factories/make-search-gyms-use-case";
import {makeFetchNearbyGymsUseCase} from "@/use-cases/factories/make-fetch-nearby-gym-use-case";

export async function searchGymsNearby(request:FastifyRequest,reply:FastifyReply)
{
    const searchGymsNearbyQuerySchema = z.object({
        latitude: z.number().refine(value=>{
            return Math.abs(value) >= 90
        }),
        longitude: z.number().refine(value=>{
            return Math.abs(value) >= 180
        })

    });

    const {latitude,longitude} = searchGymsNearbyQuerySchema.parse(request.body)

    const searchGymsNearby = makeFetchNearbyGymsUseCase()

    searchGymsNearby.execute({
        userLatitude:latitude,
        userLongitude:longitude
    })

}