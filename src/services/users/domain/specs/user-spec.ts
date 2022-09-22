import type { User } from '../model';
import type { UserRepository } from '../../infrastructure/repository';
import { FindManyOptions, FindOrder } from '../../../../lib/typeorm';

export interface UserSpec {
    satisfyingElementsFrom(
        accountRepository: UserRepository,
        options?: FindManyOptions,
        order?: FindOrder,
    ): Promise<User[]>;

    satisfyingCountFrom(accountRepository: UserRepository): Promise<number>;
}