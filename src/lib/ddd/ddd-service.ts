import { Inject } from 'typedi';
import { DddContext } from './ddd-context';
import { db } from '../typeorm';

export class DddService {
  @Inject()
  context!: DddContext;
}

export function Transactional() {
  return function (target: DddService, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = async function (this: DddService) {
          const thiz = this;
          const args = arguments;
          const originalEntityManager = this.context.entityManager;
          let result: any;
          await db.manager.transaction(async (entityManager) => {
              // Replace entityManager set in DddContext
              // We should use entityManger. see https://github.com/typeorm/typeorm/issues/2927
              thiz.context.entityManager = entityManager;
              result = await originalMethod.apply(thiz, args);
          });
          thiz.context.entityManager = originalEntityManager;
          return result;
      };
      return descriptor;
  };
}