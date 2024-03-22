import {CheckIn} from "@prisma/client";
import {ChecksInRepository} from "@/repositories/checks-in-repository";
import {ResourceNotFoundError} from "@/use-cases/errors/resource-not-found-error";

interface FetchUserChecksInHistoryUseCaseRequest{
    userId: string;
}
interface FetchUserChecksInHistoryUseCaseResponse{
    checkIns: CheckIn[];
}

export class FetchUserChecksInHistoryUseCase{
    constructor(private checkInsRepository:ChecksInRepository) {}

    async execute({
        userId
                 }:FetchUserChecksInHistoryUseCaseRequest):Promise<FetchUserChecksInHistoryUseCaseResponse>{
       const checkIns = await this.checkInsRepository.findManyByUserId(userId)

        if (!checkIns){
            throw new ResourceNotFoundError();

        }
        return {
            checkIns
        }
    }
}