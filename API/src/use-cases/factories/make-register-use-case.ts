import {PrismaUserRepository} from "@/repositories/prisma/prisma-users-repository";
import {RegisterUseCase} from "@/use-cases/register";

export function makeRegisterUseCase(){
    const prismaUserRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase(prismaUserRepository);

    return registerUseCase
}

