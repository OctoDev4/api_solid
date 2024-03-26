import {PrismaUserRepository} from "@/repositories/prisma/prisma-users-repository";
import {AuthenticateUseCase} from "@/use-cases/authenticate";
import {GetUserProfileUseCase} from "@/use-cases/get-user-profile";

export function makeGetUserProfileUseCase(){
    const usersRepository = new PrismaUserRepository()
    const useCase = new GetUserProfileUseCase(usersRepository)


    return useCase
}