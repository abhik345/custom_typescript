import { Request,Response } from "express";
import ChildCategory from "../../models/child_category.model";
import SubCategory from "../../models/sub_category.model";
import Category from "../../models/category.model";

const childCategoryIncludeOptions = {
    attributes: { exclude: ["subCategoryId", "createdAt", "updatedAt"] },
    include: {
        model: SubCategory,
        as: "subCategory",
        attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] },
        include: [{
            model: Category,
            as: "category",
            attributes: { exclude: ["createdAt", "updatedAt"] }
        }]
    }
};

export const createChildCategory = async (req : Request,res : Response) : Promise<void> => {
    try {
        const {child_category_name,subCategoryId} = req.body;

        if(!child_category_name || !subCategoryId){
            res.status(400).json({
                status : 400,
                message : "All fields are required"
            } as const);
            return;
        }
        await ChildCategory.create({
            child_category_name,
            subCategoryId
        })
        res.status(201).json({
            status : 201,
            message : "Child category created successfully",
        } as const);
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message as string
        } as const);
    }
}

export const getAllChildCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const childCategories: ChildCategory[] = await ChildCategory.findAll(childCategoryIncludeOptions);
        
        if (childCategories.length === 0) {
            res.status(404).json({
                status: 404,
                message: "No child category found"
            } as const);
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Child categories fetched successfully",
            data: childCategories as ChildCategory[]
        } as const);
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message as string
        } as const);
    }
};

export const getChildCategoryById = async (req: Request<{ id?: number }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const childCategory: ChildCategory | null = await ChildCategory.findByPk(id as number, childCategoryIncludeOptions);
        
        if (!childCategory) {
            res.status(404).json({
                status: 404,
                message: "Child category not found"
            } as const);
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Child category found",
            data: childCategory as ChildCategory
        } as const);
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message as string
        } as const);
    }
};

export const updateChildCategoryById = async (req : Request<{id?: number},{},{child_category_name : string,subCategoryId : number}>,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const updateData : Partial<{child_category_name : string,subCategoryId : number}> = req.body;
        const childCategory : ChildCategory | null = await ChildCategory.findByPk(id as number);
        if(!childCategory){
            res.status(404).json({
                status : 404,
                message : "Child category not found"
            } as const);
            return;
        }
        await childCategory.update(updateData);
        res.status(200).json({
            status : 200,
            message : "Child category updated successfully",
            data : childCategory as ChildCategory
        } as const);
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message as string
        } as const);
    }
}

export const deleteChildCategoryById = async (req : Request<{id?: number},{},{}>,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const childCategory : ChildCategory | null = await ChildCategory.findByPk(id as number);
        if(!childCategory){
            res.status(404).json({
                status : 404,
                message : "Child category not found"
            } as const);
            return;
        }
        await childCategory.destroy();
        res.status(200).json({
            status : 200,
            message : "Child category deleted successfully"
        } as const);
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message as string
        } as const)
        
    }

}