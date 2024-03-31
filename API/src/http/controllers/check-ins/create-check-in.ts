import {FastifyReply, FastifyRequest} from "fastify";
import {z} from "zod";
import {makeCheckInUseCase} from "@/use-cases/factories/make-check-in-use-case";

export async function createCheckIn(request:FastifyRequest,reply:FastifyReply){


    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    })
    const createCheckInBodySchema = z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
    });


    const {gymId} = createCheckInParamsSchema.parse(request.params)
    const {latitude,longitude} = createCheckInBodySchema.parse(request.body)

    const checkInUseCase = makeCheckInUseCase()


  const {checkIn} = await checkInUseCase.execute({
        userLatitude:latitude,
        userLongitude:longitude,
        userId:request.user.sub,
        gymId,
    })
     return reply.status(201).send({
         checkIn:checkIn,
         message: 'check in created successfully'
     })




}