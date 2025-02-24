import { handleResponse } from './../../middlewares/handleResponse';

import { Request, Response } from "express";
import Product from "../../models/product.model";
import Category from "../../models/category.model";
import SubCategory from "../../models/sub_category.model";
import ChildCategory from "../../models/child_category.model";
import GrandChildCategory from "../../models/grand_child_category.model";

/**
 * Creates a new product in the database.
 * @param req - The request object containing the required fields.
 * @param res - The response object to send the response back to the client.
 * @returns A Promise<void> that resolves when the product is created, or rejects if an error occurs.
 */
export const createProduct = async (
  req: Request<{}, {}, {
    product_name?: string;
    description: string;
    categoryId: number;
    subCategoryId: number;
    childCategoryId: number;
    grandChildCategoryId: number;
  }>,
  res: Response
): Promise<void> => {
  try {
    const {
      product_name,
      description,
      categoryId,
      subCategoryId,
      childCategoryId,
      grandChildCategoryId,
    } = req.body;

    if (
      !product_name ||
      !description ||
      !categoryId ||
      !subCategoryId ||
      !childCategoryId ||
      !grandChildCategoryId
    ) {
      return (res as any).handleResponse(400, "All fields are required");
    }

    const newProduct = await Product.create({
      product_name,
      description,
      categoryId,
      subCategoryId,
      childCategoryId,
      grandChildCategoryId,
    });

    (res as any).handleResponse(201, "Product created successfully");
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};


export const getProducts = async (req : Request,res : Response) : Promise<void> => {
    try {
        const products : Product[] = await Product.findAll({
            attributes : {
                exclude : ["createdAt","updatedAt"]
            }
        });
        if(!products.length){
            return (res as any).handleResponse(404,"No products found")
        }
        (res as any).handleResponse(200,"Products Found",products)
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
    }
}

export const getProductById = async (req : Request<{id?: number}>,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const product : Product | null = await Product.findByPk(id, {
            attributes : {
                exclude : ["createdAt","updatedAt"]
            },
            include : [
                { model: Category, as: "category" },
                { model: SubCategory, as: "subCategory" },
                { model: ChildCategory, as: "childCategory" },
                { model: GrandChildCategory, as: "grandChildCategory" },
              ],
        })
        if(!product){
            return (res as any).handleResponse(404,"No Product found")
        }
        (res as any).handleResponse(200,"Product Found",product)
    } catch (error : any) {
        (res as any).handleResponse(500,error.message);
    }
}

export const updateProdcutById = async (
  req: Request<{
    id?: number;
  }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: Partial<{
      product_name: string;
      description: string;
      categoryId: number;
      subCategoryId: number;
      childCategoryId: number;
      grandChildCategoryId: number;
    }> = req.body;
    const product: Product | null = await Product.findByPk(id);
    if (!product) {
      return (res as any).handleResponse(404, "Product not found");
    }
    await product?.update(updateData);
    (res as any).handleResponse(200, " product has been updated");
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};

export const deleteProductById = async (req : Request<{id?:number}>,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const product :Product | null = await Product.findByPk(id);
        if(!product){
            return (res as any).handleResponse(404,"Product not found")
        }
        await product.destroy();
        (res as any).handleResponse(200,"Product deleted successfully")
    } catch (error : any) {
        (res as any).handleResponse(500,error.message)
    }
}