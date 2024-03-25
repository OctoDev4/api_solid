import {CheckIn} from "@prisma/client";
import {ChecksInRepository} from "@/repositories/checks-in-repository";
import {ResourceNotFoundError} from "@/use-cases/errors/resource-not-found-error";

interface validateCheckInUseCaseRequest{
    checkInId:string
}

interface validateCheckInUseCaseResponse{
    checkIn:CheckIn
}

export class ValidateCheckInUseCase{
    constructor(private checkInRepository:ChecksInRepository) {}

    async execute({
           checkInId,
                  }:validateCheckInUseCaseRequest):Promise<validateCheckInUseCaseResponse>{

        const checkIn = await this.checkInRepository.findById(checkInId)
        if(!checkIn){
            throw new ResourceNotFoundError()
        }
        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)


        return {
            checkIn
        }

    }
}