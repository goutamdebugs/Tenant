import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { AutoMap } from "@automapper/classes";
import User from "./User";
import { UserRole } from "./UserRole";

export interface IRoleAttribute {
  name: string;
  displayName: string;
  createdBy?: number;
  createdAt?: Date;
  updatedBy?: number;
  updatedAt?: Date;
  deletedBy?: number;
  deletedAt?: Date;
}

@Table({ tableName: "roles", timestamps: true, paranoid: true })
class Role extends Model<Role, IRoleAttribute> implements IRoleAttribute {
  
  @AutoMap()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  
  @AutoMap()
  @Column(DataType.STRING)
  declare name: string;

  @AutoMap()
  @Column(DataType.STRING)
  declare displayName: string;

  // @AutoMap()
  @Column(DataType.INTEGER)
  declare createdBy: number;

  // @AutoMap()
  @Column(DataType.INTEGER)
  declare updatedBy: number;

  // @AutoMap()
  @Column(DataType.INTEGER)
  declare deletedBy: number;

  // @AutoMap()
  declare createdAt: Date;

  // @AutoMap()
  declare updatedAt: Date;

  // @AutoMap()
  declare deletedAt: Date;


  @AutoMap(() => User)
  @BelongsToMany(() => User, () => UserRole)
  declare users: User[];
}

export default Role;