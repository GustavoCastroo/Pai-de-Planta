import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { TiposPlantaService } from '../services/TiposPlanta.service';
  import { TiposPlanta } from '../domain/TiposPlanta.entity';
  
  @Controller('/tipos_planta')
  export class TiposPlantaController {
    constructor(private readonly TiposPlantaService: TiposPlantaService) {}
  
    @Get()
    getTiposPlanta(): Promise<TiposPlanta[]> {
      return this.TiposPlantaService.getAll();
    }
  
    @Get(':id')
    getTipoPlanta(@Param('id') id: string): Promise<TiposPlanta> {
      return this.TiposPlantaService.get(Number(id));
    }
  
    @Post()
    createTipoPlanta(@Body() tipoPlanta: TiposPlanta): Promise<TiposPlanta> {
      return this.TiposPlantaService.create(tipoPlanta);
    }
  
    @Put(':id')
    updateTipoPlanta(@Param('id') id: string, @Body() tipoPlanta: TiposPlanta): Promise<TiposPlanta> {
      return this.TiposPlantaService.update(Number(id), tipoPlanta);
    }
    
    @Delete(':id')
    deleteTipoPlanta(@Param('id') id: string): Promise<void> {
      return this.TiposPlantaService.delete(Number(id));
    }
  }