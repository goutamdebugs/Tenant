import { Model, Column, DataType, Table, HasMany, BelongsToMany } from "sequelize-typescript";
import User from "./User";
import Edition from "./Edition";
import TenantEdition from "./TenantEdition";
import { AutoMap } from "@automapper/classes";

// 1. Explicit Interface
export interface ITenantAttribute {
  id?: number;
  name: string;
  displayName: string;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// 2. Decorator approach
@Table({ tableName: "tenants", timestamps: true, paranoid: true })
class Tenant extends Model<Tenant, ITenantAttribute> implements ITenantAttribute {

  @AutoMap()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AutoMap()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @AutoMap()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare displayName: string;

  @AutoMap()
  @Column(DataType.INTEGER)
  createdBy?: number;

  @AutoMap()
  @Column(DataType.INTEGER)
  updatedBy?: number;

  @AutoMap()
  @Column(DataType.INTEGER)
  deletedBy?: number;

  // Timestamps
  @AutoMap()
  declare createdAt: Date;

  @AutoMap()
  declare updatedAt: Date;

  @AutoMap()
  declare deletedAt: Date;

  @HasMany(() => User)
  users!: User[];

  @BelongsToMany(() => Edition, () => TenantEdition)
  editions!: Edition[];
}

export default Tenant;