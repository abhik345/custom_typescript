import { Request, Response } from "express";
import GrandChildCategory from "../../models/grand_child_category.model";
import ChildCategory from "../../models/child_category.model";
import SubCategory from "../../models/sub_category.model";
import Category from "../../models/category.model";

const grandchildcategoryIncludeOptions = {
  attributes: { exclude: ["childCategoryId", "createdAt", "updatedAt"] },
  include: [
    {
      model: ChildCategory,
      as: "childCategory",
      attributes: { exclude: ["subCategoryId","createdAt", "updatedAt"] },
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          attributes: { exclude: ["categoryId","createdAt", "updatedAt"] },
          include: [
            {
              model: Category,
              as: "category",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
    },
  ],
};


export const createGrandChildCategory = async (req: Request, res: Response) => {
  try {
    const { grand_child_category_name, childCategoryId } = req.body;

    if (!grand_child_category_name || !childCategoryId) {
      return (res as any).handleResponse(400, "Grand Child Category name and Child Category ID are required");
    }

    const newCategory = await GrandChildCategory.create({ grand_child_category_name, childCategoryId });
    (res as any).handleResponse(201, "Grand Child Category created successfully", newCategory);
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};

export const getGrandChildCategories = async (req: Request, res: Response) => {
  try {
    const grandChildCategories = await GrandChildCategory.findAll(grandchildcategoryIncludeOptions);
    if (!grandChildCategories.length) {
      return (res as any).handleResponse(404, "No grandchild categories found");
    }
    (res as any).handleResponse(200, "Grandchild categories fetched successfully", grandChildCategories);
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};

export const getGrandChildCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const grandChildCategory = await GrandChildCategory.findByPk(id, grandchildcategoryIncludeOptions);

    if (!grandChildCategory) return (res as any).handleResponse(404, "Grand Child Category not found");
    (res as any).handleResponse(200, "Grand Child Category found", grandChildCategory);
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};

export const updateGrandChildCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData : Partial<{grand_child_category_name : string, childCategoryId : number}> = req.body;

    const grandChildCategory = await GrandChildCategory.findByPk(id);
    if (!grandChildCategory) return (res as any).handleResponse(404, "Grand Child Category not found");

    await grandChildCategory.update(updateData);
    (res as any).handleResponse(200, "Grand Child Category updated successfully", grandChildCategory);
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};

export const deleteGrandChildCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const grandChildCategory = await GrandChildCategory.findByPk(id);
    if (!grandChildCategory) return (res as any).handleResponse(404, "Grand Child Category not found");

    await grandChildCategory.destroy();
    (res as any).handleResponse(200, "Grand Child Category deleted successfully");
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};
