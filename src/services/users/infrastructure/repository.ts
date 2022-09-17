import { DddRepository } from '../../../lib/ddd';
import { Service } from 'typedi';
import { In } from 'typeorm';
import { User } from '../domain/model';

@Service()
export class UserRepository extends DddRepository<User, User['id']> {
  entityClass = User;

  async findOneOrFail(id: string) {
    this.getManager().findOneByOrFail(User, { id });
  }

  async find(conditions: {
    ids?: User['id'][];
    emails?: string[];
    names?: string[];
    providedBy?: 'kakao' | 'local';
  }) {
    return this.getManager().find(User, {
      where: strip({
        id: checkArrayValue(conditions.ids),
        email: checkArrayValue(conditions.emails),
        name: checkArrayValue(conditions.names),
        providedBy: conditions.providedBy,
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
