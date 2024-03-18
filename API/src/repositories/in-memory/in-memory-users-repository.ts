import { UsersRepository } from "@/repositories/users-repository";
import { Prisma, User } from "@prisma/client";

/**
 * Implementação da interface `UsersRepository` que utiliza uma estrutura em memória para armazenar os usuários.
 */
export class InMemoryUsersRepository implements UsersRepository {
    /**
     * Array que armazena os usuários em memória.
     */
    public items: User[] = [];

    /**
     * Busca um usuário pelo seu ID.
     * @param id O ID do usuário a ser buscado.
     * @returns Uma promessa que resolve para o usuário encontrado ou `null` se não encontrado.
     */
    async findById(id: string): Promise<User | null> {
        const user = this.items.find(user => user.id === id);
        if (!user) {
            return null;
        }
        return user;
    }

    /**
     * Busca um usuário pelo seu e-mail.
     * @param email O e-mail do usuário a ser buscado.
     * @returns Uma promessa que resolve para o usuário encontrado ou `null` se não encontrado.
     */
    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email === email);
        if (!user) {
            return null;
        }
        return user;
    }

    /**
     * Cria um novo usuário na estrutura em memória.
     * @param data Os dados do usuário a serem utilizados para criação.
     * @returns Uma promessa que resolve para o usuário recém-criado.
     */
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        };
        this.items.push(user);
        return user;
    }
}
