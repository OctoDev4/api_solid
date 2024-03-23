import {InMemoryCheckInsRepository} from "@/repositories/in-memory/in-memory-check-ins-repository";
import {GetUserMetricsUseCase} from "@/use-cases/get-user-metrics";
import {beforeEach, describe, expect, it} from "vitest";


let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase


describe('Get user metrics Use case',()=>{

    beforeEach(async ()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })


    it('should be able to get user metrics' , async ()=>{

        await checkInsRepository.create({
            user_id:'user_01',
            gym_id:'gym_01',
        })
        await checkInsRepository.create({
            user_id:'user_01',
            gym_id:'gym_01',
        })

      const {checkInsCount} = await  sut.execute({
          userId:'user_01'
      })

        expect(checkInsCount).toEqual(2)

    })
})