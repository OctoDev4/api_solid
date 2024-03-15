// Importações de Módulos
import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

// Definição da interface para os dados de entrada do caso de uso
interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}
  
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);
    
    const userExist =  await this.userRepository.findByEmail(email)
    
    if (userExist) {
      throw new Error('User already exists');
    }
    
    await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash
    });
  }
}
