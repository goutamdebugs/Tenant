import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";

import User from "./User";
import Role from "./Role";
export interface IUserRoleAttribute {
    roleId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({ tableName: "user_roles", timestamps: true })
export class UserRole extends Model<UserRole, IUserRoleAttribute> implements IUserRoleAttribute {
    
    // 1. Role ID Foreign Key
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, //Composite Primary Key
        allowNull: false
    })
    roleId!: number;

    // 2. User ID Foreign Key
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, 
        allowNull: false
    })
    userId!: number;

    
    @BelongsTo(() => Role)
    role!: Role;

    @BelongsTo(() => User)
    user!: User;
}