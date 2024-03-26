import {CheckIn} from "@prisma/client";
import {ChecksInRepository} from "@/repositories/checks-in-repository";
import {ResourceNotFoundError} from "@/use-cases/errors/resource-not-found-error";
import dayjs from "dayjs";
import {LateCheckInValidationError} from "@/use-cases/errors/late-check-in-validation-error";

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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            "minutes"
        )

        if (distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)


        return {
            checkIn
        }

    }
}