import Role from "./role.model";
import User from "./user.model";
import Category from "./category.model";


const initModels = async () => {
    await Role.sync({alter: true});
    await User.sync({alter: true});
    await Category.sync({alter: true});
}



export {Role,User, initModels};
