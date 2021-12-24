export interface UseCase<TUseCaseInput, TUseCaseOutput> {
    execute(input?: TUseCaseInput): Promise<TUseCaseOutput>;
}
