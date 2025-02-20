import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import ChildCategory from "./child_category.model";

interface GrandChildCategoryAttributes {
  id?: number;
  grand_child_category_name: string;
  childCategoryId: number;
}

interface GrandChildCategoryCreationAttributes
  extends Optional<GrandChildCategoryAttributes, "id"> {}

class GrandChildCategory
  extends Model<
    GrandChildCategoryAttributes,
    GrandChildCategoryCreationAttributes
  >
  implements GrandChildCategoryAttributes
{
  public id!: number;
  public grand_child_category_name!: string;
  public childCategoryId!: number;
}

GrandChildCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    grand_child_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Grand Child Category name cannot be empty" },
        len: {
          args: [3, 50],
          msg: "Grand Child Category name must be between 3 and 50 characters",
        },
      },
    },
    childCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChildCategory,
        key: "id",
      },
      onDelete: "CASCADE",
      validate: {
        isInt: { msg: "Child Category ID must be an integer" },
        notNull: { msg: "Child Category ID is required" },
      },
    },
  },
  {
    sequelize,
    tableName: "grand_child_categories",
    timestamps: true,
  }
);

GrandChildCategory.belongsTo(ChildCategory, {
    foreignKey : "childCategoryId",
    as: "childCategory"
})

ChildCategory.hasMany(
    GrandChildCategory,
    {
        foreignKey: "childCategoryId",
        as: "grand_child_categories"
    }
)

export default GrandChildCategory;
