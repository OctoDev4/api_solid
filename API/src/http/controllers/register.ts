// Importações de Módulos
import { FastifyReply, FastifyRequest } from "fastify"; // Importa objetos de requisição e resposta do Fastify
import { z } from "zod"; // Importa a biblioteca Zod para validação de esquemas de dados
import { registerUseCase } from "@/use-cases/register"; // Importa a função registerUseCase do módulo register

// Função de Registro
export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Define um esquema de validação utilizando Zod
  const registerBodySchema = z.object({
    name: z.string(), // ! Campo 'name' é uma string
    email: z.string().email(), // ! Campo 'email' é uma string no formato de e-mail
    password: z.string().min(8), // ! Campo 'password' é uma string com no mínimo 8 caracteres
  });

  // Extrai os campos 'name', 'email' e 'password' do corpo da requisição, aplicando o esquema de validação
  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    // Tenta chamar o caso de uso registerUseCase passando os dados extraídos da requisição
    await registerUseCase({
      name,
      email,
      password
    });
  } catch (error) {
    // * Se ocorrer um erro durante o registro, retorna uma resposta com status 409 (Conflito)
    return reply.status(409).send();
  }

  // * Se o registro for bem-sucedido, retorna uma resposta com status 201 (Criado) indicando que o usuário foi criado com sucesso
  return reply.status(201).send('user created successfully');
}
