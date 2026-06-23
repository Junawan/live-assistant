import { FirebaseAuthRepository } from "@/repositories/auth/FirebaseAuthRepository";

export class LoginUseCase {

  constructor(
    private readonly repository:
      FirebaseAuthRepository
  ) {}

  async execute(
    email: string,
    password: string
  ) {

    return this.repository.login({
      email,
      password,
    });

  }

}