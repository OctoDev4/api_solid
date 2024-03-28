// Importações de Módulos
import {FastifyReply, FastifyRequest} from "fastify";
import {z} from "zod";
import {RegisterUseCase} from "@/use-cases/register";
import {PrismaUserRepository} from "@/repositories/prisma/prisma-users-repository";
import {UserAlreadyExistsError} from "@/use-cases/errors/user-already-exists-error";
import {makeRegisterUseCase} from "@/use-cases/factories/make-register-use-case";


// Função de Registro
export async function register(request: FastifyRequest, reply: FastifyReply) {
    // Define um esquema de validação utilizando Zod
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    });

    // Extrai os campos 'name', 'email' e 'password' do corpo da requisição, aplicando o esquema de validação
    const {name, email, password} = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({name, email, password});

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({error: error.message});
        }
        throw error
    }

    return reply.status(201).send('user created successfully');
}
