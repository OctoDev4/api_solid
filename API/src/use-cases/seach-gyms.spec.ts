import {beforeEach, describe, expect, it} from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "@/use-cases/search-gyms";
import {Prisma} from "@prisma/client";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gym use case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);
    });

    it('should fetch user check-in history', async () => {
        await gymsRepository.create({
            title: 'gym-01',
            description: 'gym-01',
            latitude: new Prisma.Decimal(0.0),
            longitude: new Prisma.Decimal(0.0),
            phone: null,
        })
        await gymsRepository.create({
            title: 'gym-02',
            description: 'gym-02',
            latitude: new Prisma.Decimal(0.0),
            longitude: new Prisma.Decimal(0.0),
            phone: null,
        })

        const {gyms} = await sut.execute({
            query:'gym-01',
            page:1
        })
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'gym-01',
            })
        ])


    });
});
