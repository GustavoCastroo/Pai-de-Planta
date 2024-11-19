import { Module } from '@nestjs/common';
import { TiposPlantaController } from './app/controllers/TiposPlanta.controller';
import { TiposPlantaService } from './app/services/TiposPlanta.service';
import { DatabaseModule} from './app/repositories/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [TiposPlantaController],
  providers: [TiposPlantaService],
})
export class AppModule {}
