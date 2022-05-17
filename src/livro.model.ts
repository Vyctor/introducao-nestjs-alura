import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
class Livro extends Model<Livro> {
  @Column({ type: DataType.STRING(60), allowNull: false })
  codigo: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  nome: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  preco: number;
}

export { Livro };
