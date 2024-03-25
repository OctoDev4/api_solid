import { ChecksInRepository } from "@/repositories/checks-in-repository";
import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto"; // Importa a função randomUUID para gerar IDs únicos
import dayjs from "dayjs"; // Importa a biblioteca dayjs para manipulação de datas

export class InMemoryCheckInsRepository implements ChecksInRepository {
    public items: CheckIn[] = []; // Array que armazena os check-ins em memória

    // Método para buscar um check-in específico de um usuário em uma determinada data
    async findByUserIdOnDate(userId: string, date: Date) {
        // Determina o início e o fim do dia para a data fornecida
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        // Procura um check-in que corresponde ao usuário e está dentro do intervalo de tempo do dia fornecido
        const checkInOnSameDate = this.items.find((checkIn) => {
            // Converte a data do check-in para um objeto dayjs para comparação
            const checkInDate = dayjs(checkIn.created_at);
            // Verifica se o check-in ocorreu dentro do intervalo de tempo do dia fornecido
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
            // Retorna verdadeiro se o check-in é do usuário especificado e ocorreu na mesma data
            return checkIn.user_id === userId && isOnSameDate;
        });

        // Se não houver check-in para o usuário na data especificada, retorna null
        if (!checkInOnSameDate) {
            return null;
        }

        // Retorna o check-in encontrado
        return checkInOnSameDate;
    }

    // Método para buscar uma lista paginada de check-ins de um usuário
    async findManyByUserId(userId: string, page: number) {
        return this.items.filter(item => item.user_id === userId)
            .slice((page - 1) * 20, page * 20); // Paginação de 20 itens por página
    }

    async findById(id: string) {
        const checkIn = this.items.find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    // Método para salvar um check-in
    async save(checkIn: CheckIn){
        // Encontra o índice do check-in no array de items que tem o mesmo ID do check-in fornecido
        const checkInIndex = this.items.findIndex(item=>item.id === checkIn.id)

        // Se encontrar um check-in com o mesmo ID no array de items
        if (checkInIndex >= 0){
            // Substitui o check-in existente no array pelo novo check-in fornecido
            this.items[checkInIndex] = checkIn
        }


        return checkIn
    }



    // Método para contar o número total de check-ins de um usuário
    async countByUserId(userId: string) {
        return this.items.filter(item => item.user_id === userId).length;
    }




    // Método para criar um novo check-in
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        // Cria um novo objeto de check-in com um ID único gerado aleatoriamente
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null, // Converte a data de validação para o formato Date, se fornecida
            created_at: new Date() // Define a data de criação como a data e hora atuais
        };

        // Adiciona o novo check-in ao array de itens
        this.items.push(checkIn);

        // Retorna o check-in criado
        return checkIn;
    }
}
