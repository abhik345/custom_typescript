import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Category from "./category.model";

interface SubCategoryAttributes {
    id?: number;
    sub_category_name: string;
    sub_category_description: string;
    imageUrl: string;
    status: boolean;
    categoryId: number;
}

interface SubCategoryCreationAttributes extends Optional<SubCategoryAttributes, "id"> {}

class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
    public id!: number;
    public sub_category_name!: string;
    public sub_category_description!: string;
    public imageUrl!: string;
    public status!: boolean;
    public categoryId!: number;
}

SubCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        sub_category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Sub-category name cannot be empty." },
                len: { args: [3, 50], msg: "Sub-category name must be between 3 and 50 characters." }
            }
        },
        sub_category_description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Sub-category description cannot be empty." },
                len: { args: [10, 500], msg: "Description must be between 10 and 500 characters." }
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: "Image URL must be a valid URL." },
                notEmpty: { msg: "Image URL cannot be empty." }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: "id",
            },
            onDelete: "CASCADE",
            validate: {
                isInt: { msg: "Category ID must be an integer." },
                notNull: { msg: "Category ID is required." }
            }
        },
    },
    {
        sequelize,
        tableName: "sub_categories",
        timestamps: true,
    }
);

SubCategory.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(SubCategory, { foreignKey: "categoryId", as: "sub_categories" });

export default SubCategory;