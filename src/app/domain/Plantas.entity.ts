import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TiposPlanta } from '../domain/TiposPlanta.entity';

@Entity('plantas')
export class Plantas {
  
  @PrimaryGeneratedColumn({ name: "id_planta" })
  id_planta: number;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 100
  })
  nome: string;

  @Column({
    name: 'especie',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  especie: string | null;

  @Column({
    name: 'descricao',
    type: 'varchar',
    length: 1000,
    nullable: true
  })
  descricao: string | null;

  @Column({
    name: 'data_plantio',
    type: 'date'
  })
  data_plantio: Date; // YYYY-MM-DD

  @Column({
    name: 'luz_solar',
    type: 'int'
  })
  luz_solar: number;

  @Column({
    name: 'agua',
    type: 'int'
  })
  agua: number;

  @Column({
    name: 'tempo_entre_regas',
    type: 'int'
  })
  tempo_entre_regas: number;

  @ManyToOne(() => TiposPlanta, (tiposPlanta) => tiposPlanta.id_tipo_planta) // Coluna referenciada
  @JoinColumn({ name: 'tipo_planta' }) // Coluna de chave estrangeira
  tipo_planta: TiposPlanta;
}
