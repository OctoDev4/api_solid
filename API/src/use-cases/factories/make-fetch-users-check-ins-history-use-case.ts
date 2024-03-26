import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import {FetchUserChecksInHistoryUseCase} from "@/use-cases/fetch-user-checks-in-history";


export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserChecksInHistoryUseCase(checkInsRepository)

    return useCase
}