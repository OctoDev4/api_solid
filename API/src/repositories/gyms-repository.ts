import {Gym, Prisma} from "@prisma/client";


export interface findManyNearbyParams{
    latitude:number,
    longitude:number,
}

export interface GymsRepository{
    findById(id:string):Promise< Gym | null >
    searchMany(title:string,page:number):Promise<Gym[]>
    findManyNearby(params:findManyNearbyParams):Promise<Gym[]>
    create(data: Prisma.GymCreateInput):Promise<Gym>
}