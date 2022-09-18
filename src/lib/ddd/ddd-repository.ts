import { Inject } from 'typedi';
import { EntityManager, ObjectType } from 'typeorm';
import { Aggregate } from './aggregate';
import { DddContext } from './ddd-context';

export abstract class DddRepository<T extends Aggregate<T>, ID = number> {
  @Inject()
  private context!: DddContext;

  protected abstract entityClass: ObjectType<T>;

  protected getManager(): EntityManager {
    return this.context.entityManager;
  }

  public async save(entities: T[]) {
    entities.forEach((entity) => entity.setTxId(this.context.txId));
    await this.context.entityManager.save(entities, { reload: true }).catch((err) => {
      throw new Error(err);
    });
  }
}
