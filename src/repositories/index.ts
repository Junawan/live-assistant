import { ProductRepository } from "./product/ProductRepository";
import { PlaylistRepository } from "./playlist/PlaylistRepository";
import { CategoryRepository } from "./category/CategoryRepository";
import { CompanyRepository } from "./company/CompanyRepository";
import { HostRepository } from "./host/HostRepository";

export const productRepository = new ProductRepository();

export const playlistRepository = new PlaylistRepository();

export const categoryRepository = new CategoryRepository();

export const companyRepository = new CompanyRepository();

export const hostRepository = new HostRepository();