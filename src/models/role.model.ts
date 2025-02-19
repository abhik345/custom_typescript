import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.model";

interface RoleAttributes {
  id: number;
  role_name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public role_name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: true,
  }
);


export default Role;
