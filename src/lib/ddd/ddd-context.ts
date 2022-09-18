import { customAlphabet } from 'nanoid';
import { Container, Token } from 'typedi';
import { EntityManager } from 'typeorm';

type ClassType<T> = new (...args: any[]) => T;

export class DddContext {
  private _txId!: string;

  get!: <T>(type: ClassType<T> | Token<T>) => T;

  set!: <T>(type: ClassType<T> | Token<T>, instance: T) => void;

  dispose: () => void;

  constructor(txId: string) {
    this._txId = txId;

    const containerId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-', 10)();

    this.dispose = () => {
      Container.reset(containerId);
    };

    const container = Container.of(containerId);
    container.set(DddContext, this);

    this.get = (type) => container.get(type);

    this.set = (type, instance) => container.set(type, instance);
  }

  get txId(): string {
    return this._txId;
  }

  get entityManager(): EntityManager {
    return this.get(EntityManager);
  }

  set entityManager(entityManager: EntityManager) {
    this.set(EntityManager, entityManager);
  }
}
