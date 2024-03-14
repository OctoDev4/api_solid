// Importações de Módulos
import { prisma } from "@/lib/prisma"; // Importa a instância do PrismaClient
import { PrismaUserRepository } from "@/repositories/prisma-users-repository"; // Importa a classe PrismaUserRepository
import { hash } from "bcryptjs"; // Importa a função hash do módulo bcryptjs

// Definição da interface para os dados de entrada do caso de uso
interface RegisterUseCaseRequest {
  name: string; // ! Nome do usuário
  email: string; // ! E-mail do usuário
  password: string; // ! Senha do usuário
}

// Função assíncrona para o caso de uso de registro de usuário
export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
  // Hash da senha usando bcryptjs
  const password_hash = await hash(password, 6); // ! Criptografa a senha com um salt de 6 rounds

  // Verifica se já existe um usuário com o e-mail fornecido
  const userExist = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  // Se o usuário já existir, lança um erro
  if (userExist) {
    throw new Error('User already exists'); // * Lança uma exceção se o usuário já existir
  }

  // Cria uma instância do repositório de usuários do Prisma
  const prismaUsersRepository = new PrismaUserRepository();

  // Chama o método create do repositório para criar um novo usuário
  await prismaUsersRepository.create({
    name: name,
    email: email,
    password_hash: password_hash // * Salva a senha criptografada
  });
}
