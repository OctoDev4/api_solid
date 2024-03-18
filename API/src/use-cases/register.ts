// Importações de Módulos

import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { User } from "@prisma/client";

/**
 * Interface que define a estrutura dos dados de entrada para o caso de uso `RegisterUseCase`.
 */
interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

/**
 * Interface que define a estrutura dos dados de saída para o caso de uso `RegisterUseCase`.
 */
interface RegisterUseCaseResponse {
    user: User;
}

/**
 * Classe responsável por registrar um novo usuário.
 */
export class RegisterUseCase {
    /**
     * Construtor da classe `RegisterUseCase`.
     * @param userRepository Uma instância de `UsersRepository` para acessar os dados dos usuários.
     */
    constructor(private userRepository: UsersRepository) {}

    /**
     * Método assíncrono que executa o caso de uso `RegisterUseCase`.
     * @param name O nome do usuário a ser registrado.
     * @param email O e-mail do usuário a ser registrado.
     * @param password A senha do usuário a ser registrada.
     * @returns Uma promessa que resolve para os dados do usuário registrado.
     * @throws `UserAlreadyExistsError` se o usuário já existir.
     */
    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        // Gera o hash da senha fornecida
        const passwordHash = await hash(password, 6);

        // Verifica se o usuário já existe com base no e-mail fornecido
        const userExist = await this.userRepository.findByEmail(email);

        // Se o usuário já existir, lança um erro de usuário já existente
        if (userExist) {
            throw new UserAlreadyExistsError();
        }

        // Cria um novo usuário com os dados fornecidos
        const user = await this.userRepository.create({
            name,
            email,
            password_hash: passwordHash,
        });

        // Retorna os dados do usuário registrado
        return {
            user,
        };
    }
}
