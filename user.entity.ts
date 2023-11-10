import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "Users",
  modelName: "User",
})
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare balance: number;
}
