import {InMemoryGymsRepository} from "@/repositories/in-memory/in-memory-gyms-repository";
import {CreateGymUseCase} from "@/use-cases/create-gym";
import {beforeEach, describe, it} from "vitest";

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('create gym use case', () => {
    beforeEach(()=>{
        gymRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymRepository)
    })
    it('should be able to create a gym', async () => {
        const {gym} = await sut.execute({
            title: 'test',
            description: 'test',
            latitude: -22.3280729,
            longitude: 49.0888172,
            phone: "12345678"
        })
    })
})