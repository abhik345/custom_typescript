import Role from "./role.model";
import User from "./user.model";
import Category from "./category.model";
import SubCategory from "./sub_category.model";
import ChildCategory from "./child_category.model";
import GrandChildCategory from "./grand_child_category.model";
import Color from "./color.model";
import Fabric from "./fabric.model";


const initModels = async () => {
    await Role.sync({alter: true});
    await User.sync({alter: true});
    await Category.sync({alter: true});
    await SubCategory.sync({alter: true});
    await ChildCategory.sync({alter: true});
    await GrandChildCategory.sync({alter: true});
    await Color.sync({alter: true});
    await Fabric.sync({alter: true});
}



export {Role,User, initModels};
