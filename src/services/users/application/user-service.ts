import { DddService, Transactional } from '../../../lib/ddd';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../infrastructure/repository';
import { ProvidedByType, User } from '../domain/model';
import {FilteredUserSpec} from '../domain/specs/filtered-user-spec'

type UserInputType = {
  email: string;
  name: string;
  password: string;
  providedBy: ProvidedByType;
};

@Service()
export class UserService extends DddService {
  @Inject()
  private userRepository!: UserRepository;

  @Transactional()
  async register(args: UserInputType): Promise<User> {
    const user = User.of(args);
    await this.userRepository.save([user]);
    return user;
  }

  async list(args?:{ids?:User['id'][]; email?:string; name?:string; providedBy?:ProvidedByType}):Promise<User[]>{
    const users =await this.userRepository.findSatisfying(new FilteredUserSpec({...args}))
    return users
  }
}
