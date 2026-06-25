import { AutoMap } from "@automapper/classes";

export class ResponceEdition {
  @AutoMap()
  id!: number;

  @AutoMap()
  name!: string;

  @AutoMap()
  weeklyPrice!: number;

  @AutoMap()
  monthlyPrice!: number;

  @AutoMap()
  yearlyPrice!: number;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}