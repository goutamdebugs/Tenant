import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import Tenant from "./Tenant";
import TenantEdition from "./TenantEdition";

import { AutoMap } from "@automapper/classes";

// 1. Explicit Interface for Edition Attributes
export interface IEditionAttribute {
  id?: number;
  name: string;
  weeklyPrice: number;
  monthlyPrice: number;
  yearlyPrice: number;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// 2. Decorator approach
@Table({ tableName: "editions", timestamps: true, paranoid: true })
class Edition extends Model<Edition, IEditionAttribute> implements IEditionAttribute {

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
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare weeklyPrice: number;

  @AutoMap()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare monthlyPrice: number;

  @AutoMap()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare yearlyPrice: number;

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

  @BelongsToMany(() => Tenant, () => TenantEdition)
  tenants!: Tenant[];
}

export default Edition;