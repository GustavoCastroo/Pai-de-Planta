import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos_planta')
export class TiposPlanta {
  
  @PrimaryGeneratedColumn({ name: "id_tipo_planta"} )
  id_tipo_planta: number;

  @Column({
    name: 'tipo',
    type: 'varchar',
    length: 100
  })
  tipo: string;
}