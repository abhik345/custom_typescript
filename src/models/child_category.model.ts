import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import SubCategory from "./sub_category.model";

interface ChildCategoryAttributes {
  id?: number;
  child_category_name: string;
  subCategoryId: number;
}

interface ChildCategoryCreationAttributes
  extends Optional<ChildCategoryAttributes, "id"> {}

class ChildCategory
  extends Model<ChildCategoryAttributes, ChildCategoryCreationAttributes>
  implements ChildCategoryAttributes
{
  public id!: number;
  public child_category_name!: string;
  public subCategoryId!: number;
}

ChildCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    child_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Child category name cannot be empty" },
        len: {
          args: [3, 50],
          msg: "Child category name must be between 3 and 50 characters",
        },
      },
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubCategory,
        key: "id",
      },
      onDelete: "CASCADE",
      validate: {
        isInt: { msg: "SubCategory ID must be an integer." },
        notNull: { msg: "SubCategory ID is required." },
      },
    },
  },
  {
    sequelize,
    tableName: "child_categories",
    timestamps: true,
  }
);

ChildCategory.belongsTo(SubCategory, {
  foreignKey: "subCategoryId",
  as: "subCategory",
});
SubCategory.hasMany(ChildCategory, {
  foreignKey: "subCategoryId",
  as: "child_categories",
});

export default ChildCategory;
