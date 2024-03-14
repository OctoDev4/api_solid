import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"




interface registerUseCaseRequest{
  name:string,
  email:string,
  password:string
}

export async function registerUseCase(
  {email,
  name,
  password
  }:registerUseCaseRequest) {
    
  const password_hash = await hash(password,6)
  const userExist = await prisma.user.findUnique({
    where:{
      email: email
    }
  })

  if(userExist){
    throw new Error('user already exist')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })

}