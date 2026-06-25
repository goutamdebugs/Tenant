import { AutoMap } from "@automapper/classes";

export class ResponseRoleDto {
  @AutoMap()
  id!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  displayName!: string;

}