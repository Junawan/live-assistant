import {
  FirebaseAuthRepository,
} from "@/repositories/auth/FirebaseAuthRepository";

import {
  CompanyRepository,
} from "@/repositories/company/CompanyRepository";

import {
  UserRepository,
} from "@/repositories/user/UserRepository";

import {
  SubscriptionRepository,
} from "@/repositories/subscription/SubscriptionRepository";

import {
  CategoryRepository,
} from "@/repositories/category/CategoryRepository";

import {
  PlaylistRepository,
} from "@/repositories/playlist/PlaylistRepository";

import {
  ProductRepository,
} from "@/repositories/product/ProductRepository";

export const authRepository = new FirebaseAuthRepository();

export const companyRepository = new CompanyRepository();

export const userRepository = new UserRepository();

export const subscriptionRepository =
  new SubscriptionRepository();

export const categoryRepository =
  new CategoryRepository();

export const playlistRepository =
  new PlaylistRepository();

  export const productRepository =
  new ProductRepository();