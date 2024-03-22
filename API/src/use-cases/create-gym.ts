import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {

    title: string,
    description: string | null,
    latitude: number,
    longitude: number,
    phone: string | null
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymRepository: GymsRepository) {}

    async execute({ title, description, latitude, longitude, phone }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymRepository.create({
            title,
            description,
            latitude,
            longitude,
            phone,
        });
        return {
            gym
        };
    }
}
