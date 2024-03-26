import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import {FetchNearbyGymsNearbyGymUseCase} from "@/use-cases/fetch-nearby-gyms";


export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsNearbyGymUseCase(gymsRepository)

    return useCase
}