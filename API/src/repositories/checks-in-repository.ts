import {CheckIn, Prisma} from "@prisma/client";

export interface ChecksInRepository {

    create(data: Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>
    findByUserIdOnDate(userId:string,date:Date):Promise<CheckIn | null >
    findManyByUserId(userId:string):Promise<CheckIn[]>
}