import { Request, Response } from "express";
import User from "../../models/user.model";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
      return;
    }

    const user: User | null = await User.findOne({ where: {email} });

    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      process.env.JWT_SECRET_KEY || "secret",
      {
        expiresIn: "10d",
      }
    );

    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roleId: user.roleId,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const register = async (req : Request,res : Response) : Promise<void> => {
    try {
        const {username,email,password,roleId} = req.body;
        if(!username || !email || !password || !roleId){
            res.status(400).json({
                status : 400,
                message : "All fields are required"
            })
            return;
        }
        const existingUser : User | null = await User.findOne({where : {email}});
        if(existingUser){
            res.status(400).json({
                status : 400,
                message : "User already exists"
            })
            return;
        }
        const newUser : User | null = await User.create({
            username,
            email,
            password,
            roleId
        })
        res.status(201).json({
            status : 201,
            message : "User registered successfully",
            data : {
                id : newUser.id,
                username : newUser.username,
                email : newUser.email,
                roleId : newUser.roleId     
            }
        })
    } catch (error : any) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}
