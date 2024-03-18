import {describe, expect, it} from "vitest";
import {RegisterUseCase} from "@/use-cases/register";
import {compare} from "bcryptjs";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {UserAlreadyExistsError} from "@/use-cases/errors/user-already-exists-error";

describe('Register use Case', () => {


    it('should to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {


        const usersRepository = new InMemoryUsersRepository()
        const registerUsecase = new RegisterUseCase(usersRepository)

        const {user} = await registerUsecase.execute({
            name: 'joedoe',
            email: 'joedoe@gmail.com',
            password: 'password'
        })
        const isPasswordHashed = await compare('password', user.password_hash);


        console.log(user.password_hash)

        // Verifique se a senha está corretamente criptografada
        expect(isPasswordHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'johndoe@example.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456789',
        })

        expect(() =>
            registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456789',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
});
