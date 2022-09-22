import { DddRepository } from '../../../lib/ddd';
import { Service } from 'typedi';
import { In } from 'typeorm';
import { User } from '../domain/model';
import {UserSpec} from '../domain/specs/user-spec'
import { FindManyOptions, FindOrder } from '../../../lib/typeorm';

@Service()
export class UserRepository extends DddRepository<User, User['id']> {
  entityClass = User;

  async findSatisfying(spec: UserSpec, options?: FindManyOptions, order?: FindOrder) {
    return spec.satisfyingElementsFrom(this, options, order);
  }


  async countSatisfying(spec: UserSpec) {
    return spec.satisfyingCountFrom(this);
  }


  async findOneOrFail(id: string) {
    this.getManager().findOneByOrFail(User, { id });
  }

  async find(conditions?: {
    ids?: User['id'][];
    email?: string;
    name?: string;
    providedBy?: 'kakao' | 'local';
  }) {
    return this.getManager().find(User, {
      where: strip({
        id: checkArrayValue(conditions?.ids),
        email: conditions?.email,
        name: conditions?.name,
        providedBy: conditions?.providedBy,
      }),
    });
  }

async count(conditions: {
    ids?: User['id'][];
    email?: string;
    name?: string;
    providedBy?: 'kakao' | 'local';
}): Promise<number> {
    return this.getManager().count(User, {
      where: strip({
        id: checkArrayValue(conditions?.ids),
        email: conditions?.email,
        name: conditions?.name,
        providedBy: conditions?.providedBy,
      }),
    });
  }
}

function strip(obj: Record<string, any>) {
  return Object.keys(obj).reduce((stripped, key) => {
    if (typeof obj[key] !== 'undefined') {
      stripped[key] = obj[key];
    }
    return stripped;
  }, {} as Record<string, any>);
}

function checkArrayValue(value?: any[]) {
  return value && value.length > 0 && In(value);
}
