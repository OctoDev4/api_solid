import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { User } from "@prisma/client";

/**
 * Interface que define a estrutura dos dados de entrada para o caso de uso `AuthenticateUseCase`.
 */
interface AuthenticateRequest {
    email: string;
    password: string;
}

/**
 * Interface que define a estrutura dos dados de saída para o caso de uso `AuthenticateUseCase`.
 */
interface AuthenticateResponse {
    user: User;
}

/**
 * Classe responsável por autenticar um usuário com base no e-mail e senha fornecidos.
 */
export class AuthenticateUseCase {
    /**
     * Construtor da classe `AuthenticateUseCase`.
     * @param usersRepository Uma instância de `UsersRepository` para acessar os dados dos usuários.
     */
    constructor(private usersRepository: UsersRepository) {}

    /**
     * Método assíncrono que executa o caso de uso `AuthenticateUseCase`.
     * @param email O e-mail do usuário para autenticar.
     * @param password A senha do usuário para autenticar.
     * @returns Uma promessa que resolve para os dados do usuário autenticado.
     * @throws `InvalidCredentialsError` se as credenciais forem inválidas.
     */
    async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
        // Busca o usuário com base no e-mail fornecido
        const user = await this.usersRepository.findByEmail(email);

        // Se o usuário não for encontrado, lança um erro de credenciais inválidas
        if (!user) {
            throw new InvalidCredentialsError();
        }

        // Compara a senha fornecida com o hash da senha do usuário
        const doesPasswordMatch = await compare(password, user.password_hash);

        // Se a senha não corresponder, lança um erro de credenciais inválidas
        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        // Retorna os dados do usuário autenticado
        return {
            user,
        };
    }
}
