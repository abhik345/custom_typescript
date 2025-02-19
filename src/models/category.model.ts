import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface CategoryAttributes {
    id?: number;
    category_name: string;
    category_description: string;
    imageUrl: string;
    status: boolean;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public id!: number;
    public category_name!: string;
    public category_description!: string;
    public imageUrl!: string;
    public status!: boolean;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Category name cannot be empty" },
                len: { args: [3, 255], msg: "Category name must be between 3 and 255 characters" }
            }
        },
        category_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Category description cannot be empty" },
                len: { args: [10, 500], msg: "Description must be between 10 and 500 characters" }
            }
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Image URL cannot be empty" },
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: true,
        hooks: {
            beforeValidate: (category) => {
                if (category.category_name) category.category_name = category.category_name.trim();
                if (category.category_description) category.category_description = category.category_description.trim();
            }
        }
    }
);

export default Category;
