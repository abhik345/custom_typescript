import {Request,Response} from "express";
import Category from "../../models/category.model";
import fs from 'fs';
import path from 'path';




export const createCategory = async (req:Request,res : Response) : Promise<void> => {
    try {
        const {category_name,category_description,imageUrl,status} = req.body;
        if(!category_name || !category_description || !imageUrl){
            res.status(400).json({
                status : 400,
                message : "Please provide all fields"
            })
            return;
        }
        const category = await Category.create({
            category_name,
            category_description,
            imageUrl,
            status
        })
        res.status(201).json({
            status : 201,
            message : "Category created successfully"
        })
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}


export const getCategories = async (req:Request,res : Response) : Promise<void> => {
    try {
        const categories : Category[] = await Category.findAll({
            where : {
                status : true
            },
            attributes : {exclude : ['createdAt','updatedAt']}
        })
        if(categories.length === 0){
            res.status(404).json({
                status : 404,
                message : "No category found"
            })
            return;
        }
        res.status(200).json({
            status : 200,
            message : "Categories fetched successfully",
            data : categories
        })
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}


export const getCategoryById = async (req:Request,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const category : Category | null = await Category.findByPk(id,{
            attributes : {exclude : ['createdAt','updatedAt']}
        })
        if(!category){
            res.status(404).json({
                status : 404,
                message : "Category not found"
            })
            return;
        }
        res.status(200).json({
            status : 200,
            message : "Category fetched successfully",
            data : category
        })
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message
        })  
    }
}

export const updateCategoryById = async (
  req: Request<
    { id?: number },
    {},
    {
      category_name?: string;
      category_description?: string;
      imageUrl?: string;
      status?: boolean;
    }
  >,
  res: Response
) : Promise<void> => {
  try {
    const { id } = req.params;
    const updateData : Partial<{category_name : string,category_description : string,imageUrl : string,status : boolean}> = req.body;

    const category: Category | null = await Category.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!category) {
      res.status(404).json({
        status: 404,
        message: "Category not found",
      });
      return;
    }

    await category.update(updateData);

    res.status(200).json({
      status: 200,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const deleteCategoryById = async (req: Request,res :Response) : Promise<void> => {
    try {
        const {id} = req.params;

        const category : Category | null = await Category.findByPk(id);
        if(!category){
            res.status(404).json({
                status : 404,
                message : "Category not found"
            })
            return;
        }
        if(category.imageUrl){
            const imageFilename = path.basename(category.imageUrl);
            const imagePath = path.join(__dirname, '..', '..', 'uploads', imageFilename);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await category.destroy();
        res.status(200).json({
            status : 200,
            message : "Category deleted successfully"
        })
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
        
    }
}