import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

import Tenant from "../db/models/Tenant";
import User from "../db/models/User";
import Role from "../db/models/Role";
import Edition from "../db/models/Edition";
import TenantEdition from "../db/models/TenantEdition";
import { UserRole } from "../db/models/UserRole";

dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

if (
  !DB_NAME ||
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_HOST ||
  !DB_PORT
) {
  throw new Error(
    "Missing database environment variables"
  );
}

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: false,

  models: [
    Tenant,
    User,
    Role,
    Edition,
    TenantEdition,
    UserRole,
  ],
});

export default sequelize;