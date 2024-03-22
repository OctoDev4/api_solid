import {InMemoryCheckInsRepository} from "@/repositories/in-memory/in-memory-check-ins-repository";
import {CheckInUserCase} from "@/use-cases/check-in";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {InMemoryGymsRepository} from "@/repositories/in-memory/in-memory-gyms-repository";
import {Decimal} from '@prisma/client/runtime/library'
import {MaxDistanceError} from "@/use-cases/errors/max-distance-error";


let checkInRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymsRepository;
let sut: CheckInUserCase;

describe("Check-in use case", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymRepository = new InMemoryGymsRepository();
        sut = new CheckInUserCase(checkInRepository, gymRepository);


        gymRepository.items.push({
            description: '',
            id: 'gym-01',
            latitude: new Decimal(-22.3280729),
            longitude: new Decimal(49.0888172),
            phone: '',
            title: ''
        })
        await gymRepository.create({
            title: 'test',
            description: 'test',
            latitude: -22.3280729,
            longitude: 49.0888172,
            phone: "12345678" })



        vi.useFakeTimers()
    });

    afterEach(() => {
        vi.useRealTimers()
    })

    it('it should be able to check in', async () => {


        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -22.3280729,
            userLongitude: 49.0888172

        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('it should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -22.3280729,
            userLongitude: 49.0888172

        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -22.3280729,
            userLongitude: 49.0888172

        })).rejects.toBeInstanceOf(Error)
    })

    it('it should not be able to check in on distant gym', async () => {
        gymRepository.items.push({
            description: '',
            id: 'gym-02',
            latitude: new Decimal(-22.3280729),
            longitude: new Decimal(-49.0888172),
            phone: '',
            title: ''
        });

        await expect( () => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: 111111,
            userLongitude: 1111111
        })).rejects.toBeInstanceOf(MaxDistanceError);
    });
})

