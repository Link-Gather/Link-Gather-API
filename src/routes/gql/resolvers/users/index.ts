import { User } from "../../../../services/users/domain/model";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { UserService } from "../../../../services/users/application/user-service";

@Resolver()
@Service()
export class UserResolver{
    @Inject()
    userService!:UserService

    @Query((returns)=> [User])
    async users(){
        return this.userService.list()
    }
    
    @Mutation(() => User)
    async createUser(
        @Arg('name',(type) => String) name:string,
        @Arg('password',(type) => String) password:string,
        @Arg('email',(type) => String) email:string
    ){
        return this.userService.register({name,password,email,providedBy:'local'})
    }
}