import { Request, Response } from "express";
import SubCategory from "../../models/sub_category.model";
import Category from "../../models/category.model";

export const createSubCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      sub_category_name,
      sub_category_description,
      imageUrl,
      status,
      categoryId,
    }: {
      sub_category_name: string;
      sub_category_description: string;
      imageUrl: string;
      status: boolean;
      categoryId: number;
    } = req.body;
    if (
      !sub_category_name ||
      !sub_category_description ||
      !imageUrl ||
      !categoryId
    ) {
      res.status(400).json({
        status: 400,
        message: "Please provide all fields",
      });
      return;
    }
    const subCategory = await SubCategory.create({
      sub_category_name,
      sub_category_description,
      imageUrl,
      status,
      categoryId,
    });
    res.status(201).json({
      status: 201,
      message: "Sub-category created successfully",
    } as const);
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message as string,
    } as const);
  }
};

export const getAllSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories: SubCategory[] = await SubCategory.findAll({
      where: {
        status: true,
      },
      attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    if (subCategories.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No sub-category found",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: "Sub-categories fetched successfully",
      data: subCategories as SubCategory[],
    } as const);
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message as string,
    } as const);
  }
};

export const getSubCategoryById = async (
  req: Request<{ id: number }, {}, {}>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const subCategory: SubCategory | null = await SubCategory.findByPk(id, {
      attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    if (!subCategory) {
      res.status(404).json({
        status: 404,
        message: "Sub-category not found",
      } as const);
      return;
    }
    res.status(200).json({
      status: 200,
      message: "Sub-category fetched successfully",
      data: subCategory as SubCategory,
    } as const);
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message as string,
    } as const);
  }
};

export const updateSubCategoryById = async (
  req: Request<{ id?: number }, {}, {
    sub_category_name?: string;
    sub_category_description?: string;
    imageUrl?: string;
    status?: boolean;
    categoryId?: number;
  }>,
  res: Response
): Promise<void> => {
  try {
    const {id} = req.params
    const updateData : Partial<{sub_category_name : string,sub_category_description : string,imageUrl : string,status : boolean,categoryId : number}> = req.body;
    const subcategory : SubCategory | null = await SubCategory.findByPk(id);
    if(!subcategory){
        res.status(404).json({
            status : 404,
            message : "Sub-category not found"
        } as const);
        return;
    }
    await subcategory.update(updateData);
    res.status(200).json({
        status : 200,
        message : "Sub-category updated successfully",        
    } as const);
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message as string,
    } as const);
  }
};


export const deleteSubCategoryById = async (req : Request<{ id : number },{}, {}>,res : Response) => {
    try {
     const {id} = req.params;
     const subCategory : SubCategory | null = await SubCategory.findByPk(id);
     if(!subCategory){
         res.status(404).json({
             status : 404,
             message : "Sub-category not found"
         } as const);
         return;
     }
     await subCategory.destroy();
     res.status(200).json({
            status : 200,
            message : "Sub-category deleted successfully"
        } as const);
    } catch (error : any) {
        res.status(500).json({
            status : 500,
            message : error.message as string
        } as const);
    }
}