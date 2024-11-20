import { Module } from '@nestjs/common';
import { TiposPlantaController } from './app/controllers/TiposPlanta.controller';
import { TiposPlantaService } from './app/services/TiposPlanta.service';
import { DatabaseModule} from './app/repositories/database.module';
import { AtividadesController } from './app/controllers/Atividades.controller';
import { AtividadesService } from './app/services/Atividades.service';
import { PlantasController } from './app/controllers/Plantas.controller';
import { PlantasService } from './app/services/Plantas.service';


@Module({
  imports: [DatabaseModule],
  controllers: [TiposPlantaController, AtividadesController, PlantasController],
  providers: [TiposPlantaService, AtividadesService, PlantasService],
})
export class AppModule {}
