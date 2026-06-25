import { Model, Column, DataType, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import Tenant  from "../models/Tenant"; 
import Edition  from "../models/Edition"; 

// 1. Explicit Interface
export interface ITenantEditionAttribute {
  id?: number;
  tenantId: number;
  editionId: number;
  startDate: Date;
  endDate?: Date;
  createdBy: number;
  updatedBy?: number;
  deletedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// 2. Decorator approach
@Table({ tableName: "tenant_editions", timestamps: true, paranoid: true })
class TenantEdition extends Model<TenantEdition, ITenantEditionAttribute> implements ITenantEditionAttribute {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Tenant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tenantId!: number;

  @BelongsTo(() => Tenant)
  tenant!: Tenant;

  @ForeignKey(() => Edition)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  editionId!: number;

  @BelongsTo(() => Edition)
  edition!: Edition;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date;

  @Column(DataType.DATE)
  endDate?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy!: number;

  @Column(DataType.INTEGER)
  updatedBy?: number;

  @Column(DataType.INTEGER)
  deletedBy?: number;

  // Timestamps
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

export default TenantEdition;