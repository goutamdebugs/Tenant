import { AutoMap } from "@automapper/classes";
import { ResponseRoleDto } from "../role/ResponseRoleDto";

export class ResponseUserDto {
  @AutoMap()
  id!: number;

  @AutoMap()
  tenantId!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  surname?: string;

  @AutoMap()
  email!: string;

  @AutoMap(() => [ResponseRoleDto])
  roles!: ResponseRoleDto[]; 

  @AutoMap()
  createdAt!: Date;
}