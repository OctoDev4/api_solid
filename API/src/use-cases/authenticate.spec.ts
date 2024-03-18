import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { hash } from "bcryptjs";
import {InvalidCredentialsError} from "@/use-cases/errors/invalid-credentials-error";

describe('authenticate use case', () => {
    it('should authenticate a user', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);

        await userRepository.create({
            name: 'joe',
            email: 'joe@example.com',
            password_hash: await hash('password', 6)
        });

        const { user } = await sut.execute({
            email: 'joe@example.com',
            password: 'password'
        });
    });

    it('should not be able to authenticate with wrong email', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);

        // Usamos 'await' para esperar a resolução da Promise
        await expect(sut.execute({
            email: 'wrongemail@example.com',
            password: 'password'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    });




    it('should not be able to authenticate with wrong email', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);


        await userRepository.create({
            name: 'joe',
            email: 'joe@example.com',
            password_hash: await hash('password1', 6)
        });

        // Usamos 'await' para esperar a resolução da Promise
        await expect(sut.execute({
            email: 'wrongemail@example.com',
            password: 'password'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    });
});
