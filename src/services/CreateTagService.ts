import { getCustomRepository } from "typeorm"
import { TagRepository } from "../repositories/TagsRepository"

class CreateTagService {

    async execute(name: string) {
        const tagsRepository = getCustomRepository(TagRepository)

        if(!name){
            throw new Error('Incorrect tag name')
        }

        const alreadyExists = await tagsRepository.findOne({name})
        if(alreadyExists){
            throw new Error('Tag already exists')
        }

        const tag = tagsRepository.create({name})

        await tagsRepository.save(tag)

        return tag
    }

}

export { CreateTagService }