import {InMemoryCheckInsRepository} from "@/repositories/in-memory/in-memory-check-ins-repository";
import {CheckInUserCase} from "@/use-cases/check-in";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";


let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUserCase


describe('Check-in use case', () => {
    beforeEach(()=>{
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUserCase(checkInRepository)


        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('it should be able to check in', async()=>{

        const {checkIn} = await sut.execute({
            gymId:'gym-01',
            userId:'user-01'

        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('it should not be able to check in twice in the same day', async()=>{

        vi.setSystemTime(new Date(2022,0,20,8,0,0))

        await sut.execute({
            gymId:'gym-01',
            userId:'user-01'

        })

       await expect(()=>sut.execute({
            gymId:'gym-01',
            userId:'user-01'
        })).rejects.toBeInstanceOf(Error)
    })
})