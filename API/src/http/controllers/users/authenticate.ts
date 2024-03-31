// Importações de Módulos
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";


// Função de Autenticação
export async function AuthenticateRoute(request: FastifyRequest, reply: FastifyReply) {
    // Define um esquema de validação utilizando Zod para os campos do corpo da requisição
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    // Extrai os campos 'email' e 'password' do corpo da requisição, aplicando o esquema de validação
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        // Instancia o caso de uso de autenticação
        const authenticateUserCase = makeAuthenticateUseCase();

        // Executa o caso de uso de autenticação com o email e senha fornecidos
        const { user } = await authenticateUserCase.execute({ email, password });

        // Gera o token de autenticação JWT
        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
            },
        });

        // Gera o token de atualização JWT
        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '7d',
            },
        });

        // Retorna uma resposta de sucesso com o token de autenticação e mensagem
        return reply.status(200)
            .setCookie('refreshToken',refreshToken, { // Define um cookie de refreshToken
                path: '/', // todas rotas tera acesso
                secure: true, // Define o cookie como seguro (HTTPS)
                sameSite: true, // Define a política sameSite como true
                httpOnly: true, // Define o cookie como acessível apenas via HTTP
            })
            .send({
                token: token,
                message: 'user logged in successfully',
            });
    } catch (error) {
        // Trata erros específicos, como credenciais inválidas
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ error: error.message });
        }
        // Lança outros erros
        throw error;
    }
}
