import { BaseRepository } from "@/repositories/base/BaseRepository";
import type { Host } from "@/types";

export class HostRepository extends BaseRepository<Host> {
  async create(data: Host): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, data: Partial<Host>): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Host | null> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Host[]> {
    throw new Error("Method not implemented.");
  }
}