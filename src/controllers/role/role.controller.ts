import { Request, Response } from "express";
import Role from "../../models/role.model";

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role_name } = req.body;
    if (!role_name) {
      res.status(400).json({
        status: 400,
        message: "Role name is required",
      });
      return;
    }
    await Role.create({ role_name });
    res.status(201).json({
      status: 201,
      message: "Role created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const getAllRoles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roles = await Role.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (roles.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No roles found",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: "Roles Fetched Successfully",
      data: roles,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Updates a role by its ID.
 *
 * @param req - Express request object, expects parameters with `id` as a number and body with `role_name` as a string.
 * @param res - Express response object.
 * @returns A void Promise.
 * Request<ParamsDictionary, ResBody, ReqBody, Query>
 */
export const updateRoleById = async (
  req: Request<{ id: string }, {}, { role_name: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;

    if (!id) {
      res.status(400).json({
        status: 400,
        message: "Id not provided",
      });
      return;
    }
    if (!role_name) {
      res.status(400).json({
        status: 400,
        message: "Role name not provided",
      });
      return;
    }

    const role: Role | null = await Role.findByPk(Number(id));

    if (!role) {
      res.status(404).json({
        status: 404,
        message: "Role not found",
      });
      return;
    }

    role.role_name = role_name;
    await role.save();

    res.status(200).json({
      status: 200,
      message: "Role updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Deletes a role by its ID.
 *
 * @param req - Express request object, expects parameter `id` as a string.
 * @param res - Express response object.
 * @returns A void Promise.
 */
export const deleteRoleById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const role: Role | null = await Role.findByPk(id);

    if (!role) {
      res.status(404).json({
        status: 404,
        message: "Role not found",
      });
      return;
    }

    await role.destroy();
    res.status(200).json({
      status: 200,
      message: "Role deleted Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
