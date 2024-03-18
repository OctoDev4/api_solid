// Importações de Módulos
import { prisma } from "@/lib/prisma"; // Importa a instância do PrismaClient
import { Prisma, User } from '@prisma/client'; // Importa tipos de dados do Prisma
import { UsersRepository } from "../users-repository";

/**
 * Implementação da classe `PrismaUserRepository` que utiliza o Prisma para interagir com o banco de dados.
 */
export class PrismaUserRepository implements UsersRepository {

  /**
   * Método assíncrono para encontrar um usuário por e-mail no banco de dados.
   * @param email O e-mail do usuário a ser encontrado.
   * @returns Uma promessa que resolve para o usuário encontrado ou `null` se não houver correspondência.
   */
  async findByEmail(email: string): Promise<User | null> {
    // Utiliza o método findUnique do Prisma para encontrar um usuário pelo e-mail fornecido
    const user = await prisma.user.findUnique({
      where: { email }
    });
    // Retorna o usuário encontrado ou null se não houver correspondência
    return user;
  }

  /**
   * Método assíncrono para criar um novo usuário no banco de dados.
   * @param data Os dados do usuário a serem utilizados para criação.
   * @returns Uma promessa que resolve para o usuário recém-criado.
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    // Utiliza o método create do Prisma para criar um novo usuário com os dados fornecidos
    const user = await prisma.user.create({
      data // Passa os dados recebidos como parâmetro para o método create
    });
    // Retorna o usuário criado
    return user;
  }

}
