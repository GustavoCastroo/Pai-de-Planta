import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Atividades } from '../domain/Atividades.entity';

@Injectable()
export class AtividadesService {
  constructor(
    @Inject('ATIVIDADES_REPOSITORY')
    private readonly repository: Repository<Atividades>,
  ) {}

  async getAll(): Promise<Atividades[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<Atividades> {
    return this.repository.findOneBy({ id_atividade: id });
  }

  async create(tipoPlanta: Atividades): Promise<Atividades> {
    return this.repository.save(tipoPlanta);
  }

  async update(id: number, tipoPlanta: Atividades): Promise<Atividades> {
    const existingAtividades = await this.repository.findOneBy({
      id_atividade: id
    });
    existingAtividades.atividade = tipoPlanta.atividade;
    return this.repository.save(existingAtividades);
  }

  async delete(id: number): Promise<void> {
    this.repository.delete({ id_atividade: id });
  }
}