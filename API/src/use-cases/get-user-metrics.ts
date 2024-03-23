import {CheckIn} from "@prisma/client";
import {ChecksInRepository} from "@/repositories/checks-in-repository";

interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(private checkInsRepository: ChecksInRepository) {
    }

    async execute({userId}: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount
        }
    }
}


