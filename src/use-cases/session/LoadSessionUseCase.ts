import { UserRepository } from "@/repositories/user/UserRepository";
import { CompanyRepository } from "@/repositories/company/CompanyRepository";
import { SubscriptionRepository } from "@/repositories/subscription/SubscriptionRepository";

import type {
  User,
  Company,
  Subscription,
} from "@/types";

export interface Session {
  user: User;
  company: Company;
  subscription: Subscription;
}

export class LoadSessionUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  async execute(uid: string): Promise<Session | null> {
    const user = await this.userRepository.findById(uid);

    if (!user) {
      return null;
    }

    const company =
      await this.companyRepository.findById(
        user.companyId
      );

    if (!company) {
      return null;
    }

    const subscription =
      await this.subscriptionRepository.findByCompanyId(
        user.companyId
      );

    if (!subscription) {
      return null;
    }

    return {
      user,
      company,
      subscription,
    };
  }
}