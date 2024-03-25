import {Gym} from "@prisma/client";
import {GymsRepository} from "@/repositories/gyms-repository";


interface FetchNearbyGymsNearbyGymUseCaseRequest{
    userLatitude:number
    userLongitude:number
}

interface FetchNearbyGymsNearbyGymUseCaseResponse{
    gyms:Gym[]
}

export  class FetchNearbyGymsNearbyGymUseCase {
    constructor(private gymsRepository:GymsRepository) {}

    async execute({userLatitude,userLongitude}:FetchNearbyGymsNearbyGymUseCaseRequest):Promise<FetchNearbyGymsNearbyGymUseCaseResponse>{

        const gyms  = await this.gymsRepository.findManyNearby({
            latitude:userLatitude,
            longitude:userLongitude
        })

        return{
            gyms
        }

    }
}