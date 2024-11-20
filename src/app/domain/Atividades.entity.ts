import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('atividades')
export class Atividades {
  
  @PrimaryGeneratedColumn({ name: "id_atividade"} )
  id_atividade: number;

  @Column({
    name: 'atividade',
    type: 'varchar',
    length: 255
  })
  atividade: string;
}