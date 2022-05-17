import { Injectable } from '@nestjs/common';
import { Livro } from './livro.model';
import { InjectModel } from '@nestjs/sequelize';
import { AtualizarLivroDTO, CriarLivroDTO } from './livros.controller';

@Injectable()
class LivrosService {
  constructor(@InjectModel(Livro) private readonly livroModel: typeof Livro) {}

  async obterTodos(): Promise<Livro[]> {
    return this.livroModel.findAll();
  }

  async obterUm(id: string): Promise<Livro> {
    return this.livroModel.findByPk(id);
  }

  async criar(data: CriarLivroDTO): Promise<Livro> {
    const novoLivro = new Livro();

    Object.assign(novoLivro, {
      ...data,
    });

    return novoLivro.save();
  }

  async alterar(data: AtualizarLivroDTO): Promise<Livro> {
    const findBook = await this.livroModel.findByPk(data.id);

    if (!findBook) {
      throw new Error('Livro não encontrado');
    }
    return findBook
      .set({
        codigo: data.codigo,
        nome: data.nome,
        preco: data.preco,
      })
      .save();
  }

  apagar(id: string): void {
    this.livroModel.destroy({
      where: { id },
    });
  }
}

export { LivrosService };
