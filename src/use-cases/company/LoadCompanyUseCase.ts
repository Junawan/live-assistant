import { CompanyRepository } from "@/repositories/company/CompanyRepository";
import { UserRepository } from "@/repositories/user/UserRepository";

import type { Company } from "@/types";

export class LoadCompanyUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(uid: string): Promise<Company | null> {
    const user = await this.userRepository.findById(uid);

    if (!user) {
      return null;
    }

    const company =
      await this.companyRepository.findById(
        user.companyId
      );

    return company;
  }
}