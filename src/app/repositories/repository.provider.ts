import { DataSource } from "typeorm";
import { TiposPlanta } from "../domain/TiposPlanta.entity";

export const repositoryProvider = [
    {
        provide: 'TIPOSPLANTA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TiposPlanta),
        inject: ['MYSQL_DATA_SOURCE'],
      }
];