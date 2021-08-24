import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated (req: Request, res: Response, next: NextFunction ){
    
    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(401).end()
    }

    const token = authToken.substring(("Bearer ").length)

    console.log(token)    

    try {
        const { sub } = verify(token, "f558a7c4df9d6fa0bbf40c21bb0ba4aa") as IPayload
        
        req.user_id = sub
        
        return next()
    } catch (err) {
        return res.status(401).end()
    }
}