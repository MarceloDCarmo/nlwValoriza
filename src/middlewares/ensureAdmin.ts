import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction){

    const userRepository = getCustomRepository(UsersRepository)
    const { user_id } = req
    const { admin } = await userRepository.findOne(user_id)

    if(admin){
        return next()
    }

    return res.status(401).json({
        error: "Unauthorized. User is not an administrator"
    })
}