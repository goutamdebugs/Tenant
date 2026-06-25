import { AutoMap } from "@automapper/classes";

export class TenantResponseDto {
  @AutoMap()
  id!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  displayName!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}