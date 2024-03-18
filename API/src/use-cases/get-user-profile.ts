import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

/**
 * Interface que define a estrutura dos dados de entrada para o caso de uso `GetUserProfileUseCase`.
 */
interface GetUserProfileUseCaseRequest {
    userId: string;
}

/**
 * Interface que define a estrutura dos dados de saída para o caso de uso `GetUserProfileUseCase`.
 */
interface GetUserProfileUseCaseResponse {
    user: User;
}

/**
 * Classe responsável por obter o perfil de um usuário com base no ID fornecido.
 */
export class GetUserProfileUseCase {
    /**
     * Construtor da classe `GetUserProfileUseCase`.
     * @param usersRepository Uma instância de `UsersRepository` para acessar os dados dos usuários.
     */
    constructor(private usersRepository: UsersRepository) {}

    /**
     * Método assíncrono que executa o caso de uso `GetUserProfileUseCase`.
     * @param userId O ID do usuário cujo perfil será obtido.
     * @returns Uma promessa que resolve para os dados do perfil do usuário.
     * @throws `ResourceNotFoundError` se o usuário não for encontrado.
     */
    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        // Busca o usuário com base no ID fornecido
        const user = await this.usersRepository.findById(userId);

        // Se o usuário não for encontrado, lança um erro de recurso não encontrado
        if (!user) {
            throw new ResourceNotFoundError();
        }

        // Retorna os dados do perfil do usuário
        return {
            user,
        };
    }
}
