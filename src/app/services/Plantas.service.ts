import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Plantas } from '../domain/Plantas.entity';
import { Atividades } from '../domain/Atividades.entity'; // Supondo que você tenha a entidade Atividades
import { AtividadesPlantas } from '../domain/AtividadesPlantas.entity'; // Entidade de relacionamento entre Planta e Atividade

@Injectable()
export class PlantasService {
  constructor(
    @Inject('PLANTAS_REPOSITORY')
    private readonly repository: Repository<Plantas>,

    @Inject('ATIVIDADES_REPOSITORY')
    private readonly atividadesRepository: Repository<Atividades>,

    @Inject('ATIVIDADES_PLANTAS_REPOSITORY')
    private readonly atividadesPlantasRepository: Repository<AtividadesPlantas>,
  ) {}

  ///////////////////////////////
  ////////    PLANTAS    ////////
  ///////////////////////////////

  async getAll(): Promise<Plantas[]> {
    return this.repository.find({
      relations: ['tipo_planta'], // Inclui a relação com a entidade TiposPlanta, se não não retorna chave estrangeira
    });
  }

  // Se eu quiser retornar só o tipo do tipoPlanta
  /*
  async getAll(): Promise<Plantas[]> {
  return this.repository
    .createQueryBuilder('planta')
    .leftJoinAndSelect('planta.tipo_planta', 'tipoPlanta') // Faz o join com a tabela TiposPlanta
    .select([
      'planta.id_planta',
      'planta.nome',
      'planta.descricao',
      'planta.data_plantio',
      'planta.luz_solar',
      'planta.agua',
      'planta.tempo_entre_regas',
      'tipoPlanta.tipo',  // Seleciona apenas o campo 'tipo' de TiposPlanta
    ])
    .getMany(); // Retorna as plantas com os campos selecionados
}
  */
  async get(id: number): Promise<Plantas> {
    return this.repository.findOne({
      where: { id_planta: id },
      relations: ['tipo_planta'], 
    });
  }
  

  async create(planta: Plantas): Promise<Plantas> {
    return this.repository.save(planta);
  }

  async update(id: number, planta: Plantas): Promise<Plantas> {
    const existingPlantas = await this.repository.findOneBy({
      id_planta: id
    });
    existingPlantas.nome = planta.nome;
    existingPlantas.especie = planta.especie;
    existingPlantas.descricao = planta.descricao;
    existingPlantas.data_plantio = planta.data_plantio;
    existingPlantas.luz_solar = planta.luz_solar;
    existingPlantas.agua = planta.agua;
    existingPlantas.tempo_entre_regas = planta.tempo_entre_regas;
    existingPlantas.tipo_planta = planta.tipo_planta;

    return this.repository.save(existingPlantas);
  }

  async delete(id: number): Promise<void> {
    this.repository.delete({ id_planta: id });
  }

  ////////////////////////////////////////////
  ////////    ATIVIDADES - PLANTAS    ////////
  ////////////////////////////////////////////

  async getAllAtividadesByPlanta(id_planta: number): Promise<AtividadesPlantas[]> {
    return this.atividadesPlantasRepository.find({
      where: { planta: { id_planta } }, // Relacionamento com a planta
      relations: ['atividade', 'planta'], // Inclui as relações para pegar os dados completos
    });
  }

  async getAtividadeByPlanta(id_planta: number, id_atividade: number): Promise<AtividadesPlantas> {
    
    console.log({id_planta, id_atividade})
    const associacao = await this.atividadesPlantasRepository.findOne({
      where: {
        planta: { id_planta },
        atividade: { id_atividade },
      },
      relations: ['atividade', 'planta'], // Inclui as relações para pegar os dados completos
    });
  
    if (!associacao) {
      throw new Error('Associação entre planta e atividade não encontrada!');
    }
  
    return associacao;
  }

  async associarAtividade(
    id_planta: number,
    id_atividade: number,
    body: AtividadesPlantas,
  ): Promise<Plantas> {
    const planta = await this.repository.findOne({
      where: { id_planta: id_planta },
    });
    const atividade = await this.atividadesRepository.findOne({
      where: { id_atividade: id_atividade },
    });

    if (!planta || !atividade) {
      throw new BadRequestException('Planta ou Atividade não encontrado!');
    }

    // Criação da associação com a data_hora atual
    const associacao = this.atividadesPlantasRepository.create({
      planta,
      atividade,
      data_hora: new Date(), // A data_hora será o momento da associação
      descricao: body.descricao || null,
    });

    await this.atividadesPlantasRepository.save(associacao);

    // Retorna a planta com a atividade associada
    return planta;
  }

  async updateAtividadePlanta(
    id_planta: number,
    id_atividade: number,
    body: AtividadesPlantas
  ): Promise<AtividadesPlantas> {
    const associacao = await this.atividadesPlantasRepository.findOne({
      where: {
        planta: { id_planta },
        atividade: { id_atividade },
      },
    });
  
    if (!associacao) {
      throw new Error('Associação não encontrada!');
    }
  
    associacao.descricao = body.descricao || null;
    associacao.data_hora = body.data_hora;
  
    return this.atividadesPlantasRepository.save(associacao);
  }

  async dissociarAtividade(
    id_planta: number,
    id_atividade: number,
  ): Promise<Plantas> {
    const associacao = await this.atividadesPlantasRepository.findOne({
      where: { planta: { id_planta: id_planta }, atividade: { id_atividade: id_atividade } },
    });

    if (!associacao) {
      throw new Error('Associação não encontrada!');
    }

    await this.atividadesPlantasRepository.remove(associacao);

    // Retorna a planta após a dissociação
    const planta = await this.repository.findOne({
      where: { id_planta: id_planta },
    });

    return planta;
  }
}