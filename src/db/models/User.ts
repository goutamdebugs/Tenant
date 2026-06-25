import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { AutoMap } from "@automapper/classes";
import Tenant from "./Tenant";
import Role from "./Role";
import {UserRole} from "./UserRole";

export interface IUserAttribute {
  id?: number;
  tenantId: number;
  name: string;
  surname?: string;
  email: string;
  password: string;
  createdBy?: number;
  createdAt?: Date;
  updatedBy?: number;
  updatedAt?: Date;
  deletedBy?: number;
  deletedAt?: Date;
}
// 2. Decorator config based on your style -- make sure that 
//tsconfig.json e  -- //"experimentalDecorators": true,
    
                      //"emitDecoratorMetadata": true,
@Table({ tableName: "users", timestamps: true, paranoid: true })
class User extends Model<User, IUserAttribute> implements IUserAttribute {
  
  @AutoMap()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @AutoMap()
  @ForeignKey(() => Tenant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare tenantId: number;

  @BelongsTo(() => Tenant)
  tenant!: Tenant;

  @AutoMap(() => [Role])
  @BelongsToMany(() => Role, () => UserRole)   //User.hasMany(Role);
  roles!: Role[];

  @AutoMap()
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @AutoMap()
  @Column(DataType.STRING)
  declare surname?: string;

  @AutoMap()
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  // No @AutoMap() here to strictly prevent password from ever being mapped to frontend
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  // @AutoMap()
  @Column(DataType.INTEGER)
  declare createdBy?: number;

  // @AutoMap()
  @Column(DataType.INTEGER)
  declare updatedBy?: number;

  // @AutoMap()
  @Column(DataType.INTEGER)
  declare deletedBy?: number;

  @AutoMap()
  declare createdAt: Date;
  
  @AutoMap()
  declare updatedAt: Date;
  
  // @AutoMap()
  declare deletedAt: Date;
}

export default User;

