import Role from "./role.model";
import User from "./user.model";


const initModels = async () => {
    await Role.sync({alter: true});
    await User.sync({alter: true});
}



export {Role,User, initModels};
