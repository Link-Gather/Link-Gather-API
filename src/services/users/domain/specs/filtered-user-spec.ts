import { FindManyOptions, FindOrder } from "../../../../lib/typeorm";
import { UserRepository } from "../../infrastructure/repository";
import { ProvidedByType } from "../model";
import { UserSpec } from "./user-spec";
import {User} from '../model'

export class FilteredUserSpec implements UserSpec {
    private email?:string;
    
    private name?:string;

    private providedBy?:ProvidedByType

    private ids?: User['id'][]

    constructor({
        ids,
        email,
        name,
        providedBy
    }:{ids?:User['id'][]; email?:string; name?:string; providedBy?:ProvidedByType}){
        this.ids = ids;
        this.email = email;
        this.name = name;
        this.providedBy = providedBy
    }

    async satisfyingElementsFrom(
        userRepository: UserRepository,
        options?: FindManyOptions,
        order?: FindOrder
    ):Promise<User[]>{
        return userRepository.find({ids:this.ids,email:this.email,name:this.name,providedBy:this.providedBy})
    }

    async satisfyingCountFrom(userRepository: UserRepository): Promise<number> {
        return userRepository.count({ids:this.ids,email:this.email,name:this.name,providedBy:this.providedBy});
    }
}
