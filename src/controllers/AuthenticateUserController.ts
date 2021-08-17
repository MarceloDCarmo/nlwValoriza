import { Request, response, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController {

    async handle(req:Request, res:Response){
        const { email, password } = req.body

        const authenticator = new AuthenticateUserService()

        const token = await authenticator.execute({
            email,
            password
        })

        return res.json({"access_token":token})
    }

}

export { AuthenticateUserController }