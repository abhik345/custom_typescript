import { handleResponse } from './../../middlewares/handleResponse';
import { Request, Response } from "express";
import Fabric from "../../models/fabric.model";


export const createFabric = async (req : Request,res : Response) : Promise<void> => {
    try {
        const {fabric_name,imageUrl} = req.body;
        if(!fabric_name || !imageUrl){
            return (res as any).handleResponse(400, "Fabric name and image URL are required");
        }
        const newFabric = await Fabric.create({
            fabric_name,
            imageUrl,
            status: true
        });
        (res as any).handleResponse(201, "Fabric created successfully", newFabric);
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
    }
}


export const getFabrics = async (req : Request,res: Response) : Promise<void> => {
    try {
        const fabrics : Fabric[] = await Fabric.findAll({
            where : {
                status : true
            },
            attributes : {exclude : ['createdAt','updatedAt']}
        })

        if(fabrics.length === 0){
            return (res as any).handleResponse(404, "No fabric found");
        }
        (res as any).handleResponse(200, "Fabrics found successfully", fabrics);
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
    }
}


export const getfabricById = async (req : Request<{ id?: number }>,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const fabric : Fabric | null = await Fabric.findByPk(id, {
            attributes : {exclude : ['createdAt','updatedAt']}
        })
        if(!fabric) return (res as any).handleResponse(404, "Fabric not found");
        (res as any).handleResponse(200, "Fabric found successfully", fabric);
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
    }
}


export const updatefabricById = async (req : Request,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const updateData : Partial<{fabric_name : string, imageUrl : string}> = req.body;
        const fabric : Fabric | null = await Fabric.findByPk(id);
        if(!fabric) return (res as any).handleResponse(404, "Fabric not found");
        await fabric.update(updateData);
        (res as any).handleResponse(200, "Fabric updated successfully");
    } catch (error : any) {
        (res as any).handleResponse(500, error.message);
    }
}


export const deletefabricById = async (req : Request ,res : Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const fabric : Fabric | null = await Fabric.findByPk(id);
        if(!fabric) return (res as any).handleResponse(404, "Fabric not found");
        await fabric.destroy();
        (res as any).handleResponse(200, "Fabric deleted successfully");
    } catch ( error : any) {
        (res as any).handleResponse(500, error.message);
    }
}