import { Sequelize } from "sequelize";
import sequelize from "../../config/database"; 


import Tenant from "./Tenant";
import Edition from "./Edition";
import User from "./User";
import TenantEdition from "./TenantEdition";


Tenant.hasMany(User, { foreignKey: "tenantId" });
User.belongsTo(Tenant, { foreignKey: "tenantId" });


Tenant.belongsToMany(Edition, { through: TenantEdition, foreignKey: "tenantId" });
Edition.belongsToMany(Tenant, { through: TenantEdition, foreignKey: "editionId" });

const db = {
  sequelize,
  Sequelize,
  Tenant,
  Edition,
  User,
  TenantEdition,
};

export default db;