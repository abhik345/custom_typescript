import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ColorAttributes {
  id: number;
  name: string;
  color_code: string;
}

export interface ColorCreationAttributes
  extends Optional<ColorAttributes, "id"> {}

class Color
  extends Model<ColorAttributes, ColorCreationAttributes>
  implements ColorAttributes
{
  public id!: number;
  public name!: string;
  public color_code!: string;
}

Color.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/,
        customValidator(value: string): void {
          if (!/^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/.test(value)) {
            throw new Error(
              "Name must start with an uppercase letter and only contain alphabetic characters and spaces"
            );
          }
        },
      },
    },
    color_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "colors",
    timestamps: true,
  }
);



export default Color;