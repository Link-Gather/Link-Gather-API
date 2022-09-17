import { DddService } from '../../../lib/ddd';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../infrastructure/repository';
import { ProvidedByType, User } from '../domain/model';

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

  async register(args: UserInputType): Promise<User> {
    const user = User.of(args);
    await this.userRepository.save([user]);
    return user;
  }
}
