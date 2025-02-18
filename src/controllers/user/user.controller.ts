import { Request, Response } from "express";
import User from "../../models/user.model";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, roleId } = req.body;

    // Validate required fields
    if (!username || !email || !password || !roleId) {
      res.status(400).json({
        status: 400,
        message: "Username, email, password, and roleId are required.",
      });
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

    // Create user (password hashing happens automatically in Sequelize hooks)
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