import { Prisma, User } from "@prisma/client";

/**
 * Interface que define as operações disponíveis para manipulação de usuários.
 */
export interface UsersRepository {
    /**
     * Busca um usuário pelo seu ID.
     * @param id O ID do usuário a ser buscado.
     * @returns Uma promessa que resolve para o usuário encontrado ou `null` se não encontrado.
     */
    findById(id: string): Promise<User | null>;

    /**
     * Cria um novo usuário no banco de dados.
     * @param data Os dados do usuário a serem utilizados para criação.
     * @returns Uma promessa que resolve para o usuário recém-criado.
     */
    create(data: Prisma.UserCreateInput): Promise<User>;

    /**
     * Busca um usuário pelo seu e-mail.
     * @param email O e-mail do usuário a ser buscado.
     * @returns Uma promessa que resolve para o usuário encontrado ou `null` se não encontrado.
     */
    findByEmail(email: string): Promise<User | null>;
}
