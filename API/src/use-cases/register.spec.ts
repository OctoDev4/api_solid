import {beforeEach, describe, expect, it} from "vitest";
import {RegisterUseCase} from "@/use-cases/register";
import {compare} from "bcryptjs";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {UserAlreadyExistsError} from "@/use-cases/errors/user-already-exists-error";


let usersRepositories: InMemoryUsersRepository
let sud: RegisterUseCase

describe('Register use Case', () => {
    beforeEach(()=>{
       usersRepositories = new InMemoryUsersRepository()
        sud = new RegisterUseCase(usersRepositories)
    })

    it('should to register', async () => {


        const {user} = await sud.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {



        const {user} = await sud.execute({
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


        const email = 'johndoe@example.com'

        await sud.execute({
            name: 'John Doe',
            email,
            password: '123456789',
        })

        expect(() =>
            sud.execute({
                name: 'John Doe',
                email,
                password: '123456789',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
});
