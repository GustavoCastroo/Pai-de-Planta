import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { AtividadesService } from '../services/Atividades.service';
  import { Atividades } from '../domain/Atividades.entity';
  
  @Controller('/atividades')
  export class AtividadesController {
    constructor(private readonly AtividadesService: AtividadesService) {}
  
    @Get()
    getAtividades(): Promise<Atividades[]> {
      return this.AtividadesService.getAll();
    }
  
    @Get(':id')
    getAtividade(@Param('id') id: string): Promise<Atividades> {
      return this.AtividadesService.get(Number(id));
    }
  
    @Post()
    createAtividade(@Body() atividade: Atividades): Promise<Atividades> {
      return this.AtividadesService.create(atividade);
    }
  
    @Put(':id')
    updateAtividade(@Param('id') id: string, @Body() atividade: Atividades): Promise<Atividades> {
      return this.AtividadesService.update(Number(id), atividade);
    }
    
    @Delete(':id')
    deleteAtividade(@Param('id') id: string): Promise<void> {
      return this.AtividadesService.delete(Number(id));
    }
  }