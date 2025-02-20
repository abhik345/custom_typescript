import { Request, Response } from "express";
import SubCategory from "../../models/sub_category.model";



export const createSubCategory = async (req : Request,res : Response) :Promise<void> => {

    try {
        const {sub_category_name,sub_category_description,imageUrl,status,categoryId} = req.body;
        if(!sub_category_name || !sub_category_description || !imageUrl || !categoryId){
            res.status(400).json({
                status : 400,
                message : "Please provide all fields"
            })
            return;
        }
        const subCategory = await SubCategory.create({
            sub_category_name,
            sub_category_description,
            imageUrl,
            status,
            categoryId
        });
        res.status(201).json({
            status : 201,
            message : "Sub-category created successfully"
        })
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}