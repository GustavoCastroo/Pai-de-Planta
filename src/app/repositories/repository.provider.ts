import { DataSource } from "typeorm";
import { TiposPlanta } from "../domain/TiposPlanta.entity";
import { Atividades } from "../domain/Atividades.entity";
import { Plantas } from "../domain/Plantas.entity";
import { AtividadesPlantas } from "../domain/AtividadesPlantas.entity";

export const repositoryProvider = [
    {
      provide: 'TIPOSPLANTA_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(TiposPlanta),
      inject: ['MYSQL_DATA_SOURCE'],
    },
    {
      provide: 'ATIVIDADES_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Atividades),
      inject: ['MYSQL_DATA_SOURCE']
    },
    {
      provide: 'PLANTAS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Plantas),
      inject: ['MYSQL_DATA_SOURCE']
    },
    {
      provide: 'ATIVIDADES_PLANTAS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(AtividadesPlantas),
      inject: ['MYSQL_DATA_SOURCE']
    }
];