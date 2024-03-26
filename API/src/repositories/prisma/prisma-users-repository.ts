// Importações de Módulos
import { prisma } from "@/lib/prisma"; // Importa a instância do PrismaClient
import { Prisma, User } from '@prisma/client'; // Importa tipos de dados do Prisma
import { UsersRepository } from "../users-repository";


export class PrismaUserRepository implements UsersRepository {


  async findByEmail(email: string): Promise<User | null> {
    // Utiliza o método findUnique do Prisma para encontrar um usuário pelo e-mail fornecido
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user;
  }
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {

    const user = await prisma.user.create({
      data // Passa os dados recebidos como parâmetro para o método create
    });

    return user;
  }

}
