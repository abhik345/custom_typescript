
import { Request, Response } from "express";
import Color from "../../models/color.model";

export const createColor = async (req : Request,res : Response) : Promise<void> => {
    try {
        const { name, color_code } = req.body;
        if(!name || !color_code){
            return (res as any).handleResponse(400, "Name and color code are required");
        }
        const newColor = await Color.create({
            name,
            color_code
        });
        (res as any).handleResponse(201, "Color created successfully");
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
    }
}

export const getColors = async (req: Request, res: Response): Promise<void> => {
  try {
    const color : Color[] = await Color.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    if (!color.length) {
      return (res as any).handleResponse(404, "No colors found");
    }
    (res as any).handleResponse(200, "Colors fetched successfully", color);
  } catch (error: any) {
    (res as any).handleResponse(500, error.message);
  }
};


export const getColorById = async (req: Request<{ id?: number }>, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const color : Color | null = await Color.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });
        if(!color) return (res as any).handleResponse(404, "Color not found");
        (res as any).handleResponse(200, "Color found", color);
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
    }
}


export const updateColorById = async (req: Request<{ id?: number }>, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const updateData : Partial<{name : string, color_code : string}> = req.body;
        const color : Color | null = await Color.findByPk(id);
        if(!color) return (res as any).handleResponse(404, "Color not found");
        await color.update(updateData);
        (res as any).handleResponse(200, "Color updated successfully");
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
        
    }
}

export const deleteColorById = async (req : Request<{ id?: number }>,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const color : Color | null = await Color.findByPk(id);
        if(!color) return (res as any).handleResponse(404, "Color not found");
        await color.destroy();
        (res as any).handleResponse(200, "Color deleted successfully"); 
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);    
    }

} 