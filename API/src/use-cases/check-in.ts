import { CheckIn } from "@prisma/client";
import { ChecksInRepository } from "@/repositories/checks-in-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

import { MaxDistanceError } from "@/use-cases/errors/max-distance-error";

interface CheckInUserCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUserCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUserCase {
    constructor(
        private checkInRepository: ChecksInRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({
                      userId,
                      gymId,
                      userLongitude,
                      userLatitude
                  }: CheckInUserCaseRequest): Promise<CheckInUserCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);
        if (!gym) {
            throw new ResourceNotFoundError() ;
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber()
            }
        );

        const MAX_DISTANCE_IN_KM = 0.1;

        if (distance > MAX_DISTANCE_IN_KM) {
            throw new MaxDistanceError();
        }

        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date()
        );

        if (checkInOnSameDay) {
            throw new MaxDistanceError();
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        });
        return { checkIn };
    }
}
