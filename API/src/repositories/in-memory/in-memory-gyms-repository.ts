// Importações de módulos e tipos
import {findManyNearbyParams, GymsRepository} from "@/repositories/gyms-repository"; // Importa a interface GymsRepository
import { Gym, Prisma } from "@prisma/client"; // Importa os tipos Gym e Prisma
import { randomUUID } from "node:crypto";
import {getDistanceBetweenCoordinates} from "@/utils/get-distance-between-coordinates"; // Importa a função randomUUID do módulo node:crypto

// Implementação da classe `InMemoryGymsRepository` que implementa a interface `GymsRepository`
export class InMemoryGymsRepository implements GymsRepository {
    // Array para armazenar os itens (gym)
    public items: Gym[] = [];

    // Método assíncrono para encontrar um item (gym) pelo ID
    async findById(id: string) {
        // Procura um gym com o ID especificado no array de itens
        const gym = this.items.find((item) => item.id === id);

        // Se não encontrar o gym, retorna null
        if (!gym) {
            return null;
        }

        // Retorna o gym encontrado
        return gym;
    }

    // Método assíncrono para pesquisar vários itens (gyms) pelo título com paginação
    async searchMany(title: string, page: number) {
        // Filtra os gyms que possuem o título especificado
        const gyms = this.items.filter((item) => item.title.includes(title));

        // Retorna os gyms correspondentes à página especificada (20 gyms por página)
        return gyms.slice((page - 1) * 20, page * 20);
    }

  async findManyNearby(params: findManyNearbyParams) {
        return this.items.filter(item=>{
            const distance  = getDistanceBetweenCoordinates(

                {latitude:params.latitude,longitude:params.longitude},
                {latitude:item.latitude.toNumber(),longitude:item.longitude.toNumber()}
            )
            return distance <= 10
        })

    }

    // Método assíncrono para criar um novo item (gym)
    async create(data: Prisma.GymCreateInput) {
        // Cria um novo gym com os dados fornecidos
        const gym: Gym = {
            id: data.id || randomUUID(), // Gera um UUID aleatório se não for fornecido
            title: data.title,
            description: data.description ?? null, // Usa null se não houver descrição
            latitude: new Prisma.Decimal(data.latitude.toString()), // Converte para Decimal
            longitude: new Prisma.Decimal(data.longitude.toString()), // Converte para Decimal
            phone: data.phone ?? null // Usa null se não houver telefone

        };

        // Adiciona o gym criado ao array de itens
        this.items.push(gym);

        // Retorna o gym criado
        return gym;
    }
}
