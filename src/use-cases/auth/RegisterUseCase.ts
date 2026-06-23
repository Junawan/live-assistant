import { deleteUser } from "firebase/auth";

import { FirebaseAuthRepository } from "@/repositories/auth/FirebaseAuthRepository";
import { CompanyRepository } from "@/repositories/company/CompanyRepository";
import { UserRepository } from "@/repositories/user/UserRepository";
import { SubscriptionRepository } from "@/repositories/subscription/SubscriptionRepository";
import { CategoryRepository } from "@/repositories/category/CategoryRepository";
import { PlaylistRepository } from "@/repositories/playlist/PlaylistRepository";
import { ProductRepository } from "@/repositories/product/ProductRepository";

export interface RegisterRequest {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(
    private readonly authRepository: FirebaseAuthRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly playlistRepository: PlaylistRepository,
    private readonly ProductRepository: ProductRepository
  ) {}

  async execute(request: RegisterRequest): Promise<void> {
  console.log("STEP 1");

  const credential = await this.authRepository.register({
    email: request.email,
    password: request.password,
  });

  console.log("STEP 2");

  const uid = credential.user.uid;
  const companyId = crypto.randomUUID();

  try {
    console.log("STEP 3");

    await this.companyRepository.createCompany({
      companyId,
      ownerUid: uid,
      name: request.companyName,
      email: request.email,
    });

    console.log("STEP 4");

    await this.userRepository.createOwner({
      uid,
      companyId,
      fullName: request.fullName,
      email: request.email,
    });

    console.log("STEP 5");

    await this.subscriptionRepository.createTrial({
      subscriptionId: crypto.randomUUID(),
      companyId,
    });

    console.log("STEP 6");

    await this.categoryRepository.createDefault({
      companyId,
    });

    console.log("STEP 7");

    await this.playlistRepository.createDefault({
      companyId,
    });

    console.log("STEP 8");
  } catch (error) {
    console.error(error);

    await deleteUser(credential.user);

    throw error;
  }
}
}