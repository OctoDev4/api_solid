import {CheckIn} from "@prisma/client";
import {ChecksInRepository} from "@/repositories/checks-in-repository";

interface checkInUserCaseRequest {
    userId: string;
    gymId: string;
}

interface checkInUserCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUserCase {
    constructor(private checkInRepository: ChecksInRepository) {
    }

    async execute({userId, gymId}: checkInUserCaseRequest): Promise<checkInUserCaseResponse> {

        const checkInOnsameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnsameDay) {
            throw new Error()
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        });
        return {checkIn}
    }
}