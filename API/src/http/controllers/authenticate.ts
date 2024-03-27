// Importações de Módulos
import {FastifyReply, FastifyRequest} from "fastify";
import {z} from "zod";

import {PrismaUserRepository} from "@/repositories/prisma/prisma-users-repository";
import {AuthenticateUseCase} from "@/use-cases/authenticate";
import {InvalidCredentialsError} from "@/use-cases/errors/invalid-credentials-error";
import {makeAuthenticateUseCase} from "@/use-cases/factories/make-authenticate-use-case";


// Função de Registro
export async function AuthenticateRoute(request: FastifyRequest, reply: FastifyReply) {
    // Define um esquema de validação utilizando Zod
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    // Extrai os campos 'name', 'email' e 'password' do corpo da requisição, aplicando o esquema de validação
    const {email, password} = authenticateBodySchema.parse(request.body);

    try {
       const authenticateUserCase = makeAuthenticateUseCase()

       const {user} = await authenticateUserCase.execute({email, password});

       const token = await reply.jwtSign({},{
           sign:{
               sub:user.id,

           }
       })

        return reply.status(200).send({
            token:token,
            message:'user logged in successfully'
        });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({error: error.message});
        }
        throw error
    }


}
