// Importações de Módulos
import { prisma } from "@/lib/prisma"; // Importa a instância do PrismaClient
import { Prisma } from '@prisma/client'; // Importa tipos de dados do Prisma

// Definição da classe PrismaUserRepository
export class PrismaUserRepository {
  
  // Método assíncrono para criar um novo usuário no banco de dados
  async create(data: Prisma.UserCreateInput) {
    // Utiliza o método create do Prisma para criar um novo usuário com os dados fornecidos
    const user = await prisma.user.create({
      data // Passa os dados recebidos como parâmetro para o método create
    });
    
    // Retorna o usuário criado
    return user;
  }
}
