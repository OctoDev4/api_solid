import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";


interface GetUserProfileUseCaseRequest {
    userId: string;
}


interface GetUserProfileUseCaseResponse {
    user: User;
}

/**
 * Classe responsável por obter o perfil de um usuário com base no ID fornecido.
 */
export class GetUserProfileUseCase {

    constructor(private usersRepository: UsersRepository) {}


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
