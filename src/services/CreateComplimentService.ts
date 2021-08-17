import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { UsersRepository } from "../repositories/UsersRepository"

interface IComplimentRequest {
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}

class CreateComplimentService {

    async execute({tag_id, user_sender, user_receiver, message}:IComplimentRequest){

        const complimentRepository = getCustomRepository(ComplimentsRepository)
        const userRepository = getCustomRepository(UsersRepository)

        if(user_sender === user_receiver){
            throw new Error ("Sender and Receiver users can't be the same")
        }

        const receiverExists = await userRepository.findOne(user_receiver)
        
        if(!receiverExists){
            throw new Error ("User receiver doesn't exists")
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentRepository.save(compliment)

        return compliment
    }

}

export { CreateComplimentService }