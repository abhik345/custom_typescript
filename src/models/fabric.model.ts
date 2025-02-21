import { DataTypes,Model,Optional } from "sequelize";
import { sequelize } from "../config/database";


interface FabricAttributes {
    id?: number;
    fabric_name : string;
    imageUrl : string;
    status : boolean;
}

export interface FabricCreationAttributes extends Optional<FabricAttributes, "id"> {}

class Fabric
  extends Model<FabricAttributes, FabricCreationAttributes>
  implements FabricAttributes
{
  public id!: number;
  public fabric_name!: string;
  public imageUrl!: string;
  public status!: boolean;
}

Fabric.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    fabric_name : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : { msg : "Fabric name cannot be empty" },
            len : { args : [3,50], msg : "Fabric name must be between 3 and 50 characters" }
        }
    },
    imageUrl : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : { msg : "Image URL cannot be empty" }
        }
    },
    status : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : true
    }
}, 
{
    sequelize,
    modelName : "fabrics",
    timestamps : true
})


export default Fabric;