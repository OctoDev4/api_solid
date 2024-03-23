import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserChecksInHistoryUseCase } from "@/use-cases/fetch-user-checks-in-history";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let checkInRepository: InMemoryCheckInsRepository;
let sut: FetchUserChecksInHistoryUseCase;

describe("Fetch Check in history", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new FetchUserChecksInHistoryUseCase(checkInRepository);
    });

    afterEach(() => {
        // Limpar recursos
    });

    it('it should fetch user check-in history', async () => {
        // Adicionar alguns check-ins para o repositório antes de buscar o histórico
        await checkInRepository.create({ gym_id: '01', user_id: 'user-01' });
        await checkInRepository.create({ gym_id: '02', user_id: 'user-01' });

        const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 });

          expect(checkIns).toHaveLength(2);
          expect(checkIns).toEqual([
              expect.objectContaining({ gym_id: '01' }),
              expect.objectContaining({ gym_id: '02' })
          ])

    });

    it('it should able to fetch paginated user check in history', async () => {
        // Adicionar alguns check-ins para o repositório antes de buscar o histórico
      for (let i=1; i <= 22; i++){
          await checkInRepository.create({ gym_id: `${i}`, user_id: 'user-01' });

        }

        const { checkIns } = await sut.execute({ userId: 'user-01' , page: 2});

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: '21' }),
            expect.objectContaining({ gym_id: '22' })
        ])

    });
});
