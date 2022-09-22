import { User } from "../../../../services/users/domain/model";
import { Query, Resolver } from "type-graphql";
import { DddService } from "../../../../lib/ddd";
import { Inject } from "typedi";
import { UserService } from "../../../../services/users/application/user-service";

@Resolver()
export class UserResolver extends DddService{
    @Inject()
    private userService!: UserService;

    @Query((returns)=> [User])
    async users(){
        return this.userService.list()
    }
}