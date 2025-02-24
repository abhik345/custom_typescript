import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Category from "./category.model";
import SubCategory from "./sub_category.model";
import ChildCategory from "./child_category.model";
import GrandChildCategory from "./grand_child_category.model";

interface ProductAttributes {
  id?: number;
  product_name: string;
  description: string;
  categoryId: number;
  subCategoryId: number;
  childCategoryId: number;
  grandChildCategoryId: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public product_name!: string;
  public description!: string;
  public categoryId!: number;
  public subCategoryId!: number;
  public childCategoryId!: number;
  public grandChildCategoryId!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Product name cannot be empty" },
        len: {
          args: [3, 255],
          msg: "Product name must be between 3 and 255 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Product description cannot be empty" },
        len: {
          args: [10, 500],
          msg: "Description must be between 10 and 500 characters",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubCategory,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    childCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChildCategory,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    grandChildCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GrandChildCategory,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "product",
    timestamps: true,
    hooks: {
      beforeValidate: (product) => {
        if (product.product_name) product.product_name = product.product_name.trim();
        if (product.description) product.description = product.description.trim();
      },
    },
  }
);


Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Product.belongsTo(SubCategory, { foreignKey: "subCategoryId", as: "subCategory" });
Product.belongsTo(ChildCategory, { foreignKey: "childCategoryId", as: "childCategory" });
Product.belongsTo(GrandChildCategory, { foreignKey: "grandChildCategoryId", as: "grandChildCategory" });

Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
SubCategory.hasMany(Product, { foreignKey: "subCategoryId", as: "products" });
ChildCategory.hasMany(Product, { foreignKey: "childCategoryId", as: "products" });
GrandChildCategory.hasMany(Product, { foreignKey: "grandChildCategoryId", as: "products" });

export default Product;
