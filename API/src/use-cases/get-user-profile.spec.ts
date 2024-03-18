import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

let userRepository = new InMemoryUsersRepository();
let sut = new GetUserProfileUseCase(userRepository);

describe('get user profile use case', () => {
    it('should be able to get user profile', async () => {
        const createdUser = await userRepository.create({
            name: 'joe',
            email: 'joe@example.com',
            password_hash: await hash('password', 6)
        });

        const { user } = await sut.execute({
            userId: createdUser.id
        });

        expect(user.id).toEqual(expect.any(String));
        expect(user.name).toEqual('joe');
    });

    it('should not be able to get user profile with non-existing id', async () => {
        await expect(sut.execute({ userId: 'non-exists-id' })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
