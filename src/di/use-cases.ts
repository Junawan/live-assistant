import { RegisterUseCase } from "@/use-cases/auth/RegisterUseCase";
import { LoadCompanyUseCase } from "@/use-cases/company/LoadCompanyUseCase";
import { LogoutUseCase } from "@/use-cases/auth/LogoutUseCase";
import { GetProductsUseCase } from "@/use-cases/product/GetProductsUseCase";
import { CreateProductUseCase } from "@/use-cases/product/CreateProductUseCase";
import { UpdateProductUseCase } from "@/use-cases/product/UpdateProductUseCase";
import { DeleteProductUseCase } from "@/use-cases/product/DeleteProductUseCase";
import { GetDashboardStatsUseCase } from "@/use-cases/dashboard/GetDashboardStatsUseCase";

import {
  authRepository,
  companyRepository,
  userRepository,
  subscriptionRepository,
  categoryRepository,
  playlistRepository,
  productRepository,
} from "./repositories";
import { ImportProductsUseCase } from "@/use-cases/product/ImportProductsUseCase";

import { GetPlaylistsUseCase } from "@/use-cases/playlist/GetPlaylistsUseCase";
import { CreatePlaylistUseCase } from "@/use-cases/playlist/CreatePlaylistUseCase";
import { UpdatePlaylistUseCase } from "@/use-cases/playlist/UpdatePlaylistUseCase";
import { DeletePlaylistUseCase } from "@/use-cases/playlist/DeletePlaylistUseCase";
import { GetProductsByIdsUseCase } from "@/use-cases/product/GetProductsByIdsUseCase";
import { GetPlaylistUseCase } from "@/use-cases/playlist/GetPlaylistUseCase";
import { AddProductToPlaylistUseCase } from "@/use-cases/playlist/AddProductToPlaylistUseCase";
import { GetPlaylistByIdUseCase } from "@/use-cases/playlist/GetPlaylistByIdUseCase";

export const registerUseCase =
  new RegisterUseCase(
    authRepository,
    companyRepository,
    userRepository,
    subscriptionRepository,
    categoryRepository,
    playlistRepository,
    productRepository,
  );

  export const loadCompanyUseCase =
  new LoadCompanyUseCase(
    userRepository,
    companyRepository
  );

  export const logoutUseCase =
  new LogoutUseCase(authRepository);

  export const createProductUseCase =
  new CreateProductUseCase(
    productRepository
  );

export const getProductsUseCase =
  new GetProductsUseCase(
    productRepository
  );

  export const updateProductUseCase =
  new UpdateProductUseCase(
    productRepository
  );

  export const deleteProductUseCase =
  new DeleteProductUseCase(
    productRepository
    
  );

  export const getDashboardStatsUseCase =
  new GetDashboardStatsUseCase(
    productRepository,
    categoryRepository,
    playlistRepository
  );

  export const importProductsUseCase =
    new ImportProductsUseCase(
        productRepository
    );

    export const getPlaylistsUseCase =
  new GetPlaylistsUseCase(
    playlistRepository
  );

export const createPlaylistUseCase =
  new CreatePlaylistUseCase(
    playlistRepository
  );

export const updatePlaylistUseCase =
  new UpdatePlaylistUseCase(
    playlistRepository
  );

export const deletePlaylistUseCase =
  new DeletePlaylistUseCase(
    playlistRepository
  );

  export const getProductsByIdsUseCase =
  new GetProductsByIdsUseCase(
    productRepository
  );

  export const getPlaylistUseCase =
  new GetPlaylistUseCase(
    playlistRepository
  );

  export const addProductToPlaylistUseCase =
  new AddProductToPlaylistUseCase(
    playlistRepository
  );

  export const getPlaylistByIdUseCase =
  new GetPlaylistByIdUseCase(
    playlistRepository
  );