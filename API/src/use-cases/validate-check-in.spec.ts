import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {ValidateCheckInUseCase} from "@/use-cases/validate-check-in";
import {ResourceNotFoundError} from "@/use-cases/errors/resource-not-found-error";
import {LateCheckInValidationError} from "@/use-cases/errors/late-check-in-validation-error";

let checkInRepository: InMemoryCheckInsRepository;

let sut: ValidateCheckInUseCase;

describe("Check-in use case", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(checkInRepository);


        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to check in', async () => {

        const createdCheckIn = await checkInRepository.create({
            gym_id:'gym-01',
            user_id:'user-01'
        })


     const {checkIn} =  await sut.execute({
           checkInId:createdCheckIn.id
        });


        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))

    });

    it('should not be able to validate inexisting checj in', async () => {
     await expect(()=>sut.execute({
          checkInId:'inexistent check in Id'
      })
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
        
    });

    it('should not be able to validate the check in after 20 minutes of its creation', async () => {
       vi.setSystemTime(new Date(2024,0,1,13,40))//utc

        const createdCheckIn = await checkInRepository.create({
            gym_id:'gym_01',
            user_id:'user_01'
        })

        const twentyOneMinutesInMs = 1000 * 600 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

       await expect(()=>sut.execute({
            checkInId: createdCheckIn.id
        })).rejects.toBeInstanceOf(LateCheckInValidationError)
    })

});
