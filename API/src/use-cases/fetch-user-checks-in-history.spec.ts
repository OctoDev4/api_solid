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

        const { checkIns } = await sut.execute({ userId: 'user-01' });

        // Verificar se o resultado é uma matriz de check-ins
        expect(Array.isArray(checkIns)).toBe(true);
        // Verificar se o resultado não está vazio
        expect(checkIns.length).toBeGreaterThan(0);
        // Verificar se os check-ins pertencem ao usuário específico
        expect(checkIns.every(checkIn => checkIn.user_id === 'user-01')).toBe(true);
    });
});
