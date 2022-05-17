import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Livro } from './livro.model';
import { LivrosService } from './livros.service';

export interface CriarLivroDTO {
  codigo: string;
  nome: string;
  preco: number;
}

export interface AtualizarLivroDTO {
  id: string;
  codigo: string;
  nome: string;
  preco: number;
}

@Controller('livros')
export class LivrosController {
  constructor(private livrosService: LivrosService) {}

  @Get('/')
  async obterTodos(): Promise<Livro[]> {
    return this.livrosService.obterTodos();
  }

  @Get('/:id')
  async obterUm(@Param() params: { id: string }): Promise<Livro> {
    return this.livrosService.obterUm(params.id);
  }

  @Post()
  async criar(
    @Body()
    criarLivroDTO: CriarLivroDTO,
  ): Promise<Livro> {
    return this.livrosService.criar(criarLivroDTO);
  }

  @Put('/:id')
  async alterar(
    @Param() params: { id: string },
    @Body() atualizarLivroDTO: AtualizarLivroDTO,
  ): Promise<Livro> {
    return this.livrosService.alterar({
      id: params.id,
      codigo: atualizarLivroDTO.codigo,
      nome: atualizarLivroDTO.nome,
      preco: atualizarLivroDTO.preco,
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  apagar(@Param() params: { id: string }): void {
    return this.livrosService.apagar(params.id);
  }
}
