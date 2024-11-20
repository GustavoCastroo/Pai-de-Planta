import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { PlantasService } from '../services/Plantas.service';
  import { Plantas } from '../domain/Plantas.entity';
import { AtividadesPlantas } from '../domain/AtividadesPlantas.entity';
  
  @Controller('/plantas')
  export class PlantasController {
    constructor(private readonly PlantasService: PlantasService) {}
    
    ///////////////////////////////
    ////////    PLANTAS    ////////
    ///////////////////////////////

    @Get()
    getPlantas(): Promise<Plantas[]> {
      return this.PlantasService.getAll();
    }
  
    @Get(':id')
    getTipoPlantas(@Param('id') id: string): Promise<Plantas> {
      return this.PlantasService.get(Number(id));
    }
  
    @Post()
    createTipoPlantas(@Body() planta: Plantas): Promise<Plantas> {
      return this.PlantasService.create(planta);
    }
  
    @Put(':id')
    updateTipoPlantas(@Param('id') id: string, @Body() planta: Plantas): Promise<Plantas> {
      return this.PlantasService.update(Number(id), planta);
    }
    
    @Delete(':id')
    deleteTipoPlantas(@Param('id') id: string): Promise<void> {
      return this.PlantasService.delete(Number(id));
    }
    
    ////////////////////////////////////////////
    ////////    ATIVIDADES - PLANTAS    ////////
    ////////////////////////////////////////////

    @Get(':id_planta/atividades')
    async getAllAtividades(@Param('id_planta') id_planta: string): Promise<any> {
      const atividades = await this.PlantasService.getAllAtividadesByPlanta(Number(id_planta));
      return { atividades };
    }

    @Get(':id_planta/atividades/:id_atividade')
    async getAtividade(
      @Param('id_planta') id_planta: string,
      @Param('id_atividade') id_atividade: string,
    ): Promise<any> {
      const atividade = await this.PlantasService.getAtividadeByPlanta(Number(id_planta), Number(id_atividade));
      return atividade;
    }

    @Post(':id_planta/atividades')
    async associarAtividade(
      @Param('id_planta') id_planta: string,
      @Query('id_atividade') id_atividade: string,      
      @Body() body: AtividadesPlantas,
    ): Promise<any> { 
        const planta = await this.PlantasService.associarAtividade(Number(id_planta), Number(id_atividade), body);
        return { message: 'Atividade associada com sucesso!', planta };     
    }
    
    // Endpoint para atualizar a atividade associada a uma planta
    @Put(':id_planta/atividades/:id_atividade')
    async updateAtividade(
      @Param('id_planta') id_planta: string,
      @Param('id_atividade') id_atividade: string,
      @Body() body: AtividadesPlantas,
    ): Promise<any> {
      const updatedAtividade = await this.PlantasService.updateAtividadePlanta(Number(id_planta), Number(id_atividade), body);
      return { message: 'Atividade atualizada com sucesso!', updatedAtividade };
    }


    @Delete(':id_planta/atividades/:id_atividade')
    async dissociarAtividade(
      @Param('id_planta') id_planta: string,
      @Param('id_atividade') id_atividade: string,
    ): Promise<any> {
      const planta = await this.PlantasService.dissociarAtividade(Number(id_planta), Number(id_atividade));
      return { message: 'Atividade dissociada com sucesso!', planta };
    }
  }