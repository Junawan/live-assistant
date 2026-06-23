import { FirebaseAuthRepository } from "@/repositories/auth/FirebaseAuthRepository";

export class LogoutUseCase {
  constructor(
    private readonly authRepository: FirebaseAuthRepository
  ) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}