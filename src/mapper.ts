import { createMapper, createMap, forMember, mapFrom } from "@automapper/core";
// import { classes } from "@automapper/classes";
import { sequelize } from "@automapper/sequelize";
import Tenant from "../src/db/models/Tenant";
import { TenantResponseDto } from "../src/dtos/tenent/TenantResponseDto";
import Edition from "../src/db/models/Edition";
import { ResponceEdition } from "../src/dtos/edition/ResponceEdition";
import User from "../src/db/models/User";
import {ResponseUserDto} from "../src/dtos/user/ResponseUserDto"
import Role from "../src/db/models/Role";
import { ResponseRoleDto } from "./dtos/role/ResponseRoleDto";
export const mapper = createMapper({
 strategyInitializer: sequelize(),
});


createMap(mapper, Tenant, TenantResponseDto);
createMap(mapper, Edition, ResponceEdition);

createMap(mapper,Role,ResponseRoleDto)

createMap(
  mapper,
  User,
  ResponseUserDto
);