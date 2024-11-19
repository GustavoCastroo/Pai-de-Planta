import { DataSource } from "typeorm";

export const datasourceProvider = [
{
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
        const datasource: DataSource = new DataSource({
            type: "mysql",
            host: "172.17.0.2",
            port: 3306,
            username: "root",
            password: "mysql123",
            database: "pai_de_planta",
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true
        });
        return datasource.initialize();
    }
}
];