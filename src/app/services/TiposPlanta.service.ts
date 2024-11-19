import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TiposPlanta } from '../domain/TiposPlanta.entity';

@Injectable()
export class TiposPlantaService {
  constructor(
    @Inject('TIPOSPLANTA_REPOSITORY')
    private readonly repository: Repository<TiposPlanta>,
  ) {}

  async getAll(): Promise<TiposPlanta[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<TiposPlanta> {
    return this.repository.findOneBy({ id_tipos_planta: id });
  }

  async create(tipoPlanta: TiposPlanta): Promise<TiposPlanta> {
    return this.repository.save(tipoPlanta);
  }

  async update(id: number, tipoPlanta: TiposPlanta): Promise<TiposPlanta> {
    const existingTiposPlanta = await this.repository.findOneBy({
      id_tipos_planta: id
    });
    existingTiposPlanta.tipo = tipoPlanta.tipo;
    return this.repository.save(existingTiposPlanta);
  }

  async delete(id: number): Promise<void> {
    this.repository.delete({ id_tipos_planta: id });
  }
}