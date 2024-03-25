import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserChecksInHistoryUseCase } from "@/use-cases/fetch-user-checks-in-history";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Repositório em memória para check-ins
let checkInRepository: InMemoryCheckInsRepository;
// Caso de uso para buscar histórico de check-ins do usuário
let sut: FetchUserChecksInHistoryUseCase;

// Descrição dos testes
describe("Fetch Check in history", () => {
    // Configuração antes de cada teste
    beforeEach(async () => {
        // Inicializa o repositório de check-ins em memória
        checkInRepository = new InMemoryCheckInsRepository();
        // Inicializa o caso de uso para buscar histórico de check-ins do usuário
        sut = new FetchUserChecksInHistoryUseCase(checkInRepository);
    });

    // Limpeza após cada teste
    afterEach(() => {
        // Limpar recursos (se necessário)
    });

    // Teste para verificar se o histórico de check-ins de um usuário é recuperado corretamente
    it('it should fetch user check-in history', async () => {
        // Adiciona alguns check-ins ao repositório antes de buscar o histórico
        await checkInRepository.create({ gym_id: '01', user_id: 'user-01' });
        await checkInRepository.create({ gym_id: '02', user_id: 'user-01' });

        // Executa o caso de uso para buscar o histórico de check-ins do usuário
        const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 });

        // Verifica se o número de check-ins retornados é o esperado
        expect(checkIns).toHaveLength(2);
        // Verifica se os check-ins retornados têm os atributos corretos
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: '01' }),
            expect.objectContaining({ gym_id: '02' })
        ]);
    });

    // Teste para verificar a funcionalidade de busca paginada no histórico de check-ins do usuário
    it('it should able to fetch paginated user check in history', async () => {
        // Adiciona uma quantidade maior de check-ins ao repositório
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({ gym_id: `${i}`, user_id: 'user-01' });
        }

        // Executa o caso de uso para buscar o histórico de check-ins do usuário na segunda página
        const { checkIns } = await sut.execute({ userId: 'user-01' , page: 2 });

        // Verifica se apenas os check-ins correspondentes à página 2 são retornados
        expect(checkIns).toHaveLength(2);
        // Verifica se os check-ins retornados têm os atributos corretos
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: '21' }),
            expect.objectContaining({ gym_id: '22' })
        ]);
    });
});
