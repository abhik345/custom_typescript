import { Request, Response } from "express";
import User from "../../models/user.model";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, roleId } = req.body;
    if (!username || !email || !password || !roleId) {
      res.status(400).json({
        status: 400,
        message: "Username, email, password, and roleId are required.",
      });
      return;
        return;
    }

    // Check if email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({
        status: 409,
        message: "Email already exists. Please use a different email.",
      });
      return;
    }
    const newUser = await User.create({ username, email, password, roleId });

    res.status(201).json({
      status: 201,
      message: "User created successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        roleId: newUser.roleId,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};



export const getAllUsers = async (req : Request,res : Response) : Promise<void> => {
    try {
        const users : User[] = await User.findAll({
            attributes : {
                exclude : ["createAt","updatedAt"]
            }
        })
        if(users.length === 0) {
            res.status(404).json({
                status : 404,
                message : "No user found"
            })
            return;
        }

        res.status(200).json({
            status : 200,
            message : "user found",
            data : users
        })
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }

}


/**
 * @function getUserById
 * @description Gets a user by id
 * @param {Request<{id: string}, {}, {}>} req - Express request object, expects parameter `id` as a string.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves to nothing.
 */
export const getUserById = async (req: Request<{id: number}, {}, {}>, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const user: User | null = await User.findByPk(id);
        if(!user){
            res.status(404).json({
                status : 404,
                message : "user not found"
            } as const);
            return;
        }
        res.status(200).json({
            status : 200,
            message : "user found",
            data : user
        } as const);
    } catch (error: any) {
        res.status(500).json({
            status : 500,
            message : error.message
        } as const);
    }
}


export const updateUserById = async (
    req: Request<{ id: number }, {}, { username?: string; email?: string; password?: string; roleId?: number }>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData: Partial<{ username: string; email: string; password: string; roleId: number }> = req.body;
      const user: User | null = await User.findByPk(id);
      if (!user) {
        res.status(404).json({
          status: 404,
          message: "No User Found",
        });
        return;
      }
      await user.update(updateData);
      res.status(200).json({
        status: 200,
        message: "User updated successfully",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          roleId: user.roleId,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        message: error.message || "Internal Server Error",
      });
    }
  };
  

  /**
 * Deletes a user by their ID.
 *
 * @param req - Express request object, expects parameter `id` as a number.
 * @param res - Express response object.
 * @returns A Promise that resolves to void.
 */
export const deleteById = async (
    req: Request<{ id: number }, {}, {}>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const user: User | null = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                status: 404,
                message: "User not found"
            });
            return;
        }
        await user.destroy();
        res.status(200).json({
            status: 200,
            message: "User deleted successfully"
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
