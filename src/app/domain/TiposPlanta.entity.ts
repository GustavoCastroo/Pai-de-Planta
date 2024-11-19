import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos_planta')
export class TiposPlanta {
  
  @PrimaryGeneratedColumn({ name: "id_tipos_planta"} )
  id_tipos_planta: number;

  @Column()
  tipo: string;
}