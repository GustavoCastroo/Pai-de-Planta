import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Plantas } from './Plantas.entity';
import { Atividades } from './Atividades.entity';

@Entity('atividades_plantas')
export class AtividadesPlantas {
  
  @PrimaryGeneratedColumn({ name: 'id_atividade_planta' })
  id_atividade_planta: number;

  @ManyToOne(() => Atividades, (atividade) => atividade.id_atividade)
  @JoinColumn({ name: 'atividade' }) // Chave estrangeira para Atividades
  atividade: Atividades;

  @ManyToOne(() => Plantas, (planta) => planta.id_planta)
  @JoinColumn({ name: 'planta' }) // Chave estrangeira para Plantas
  planta: Plantas;

  @Column({
    name: 'data_hora',
    type: 'timestamp',
  })
  data_hora: Date;

  @Column({
    name: 'descricao',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  descricao: string | null;
}
