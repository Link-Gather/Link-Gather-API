import { customAlphabet } from 'nanoid';
import { Container, ContainerInstance, Token } from 'typedi';
import { EntityManager } from 'typeorm';

type ClassType<T> = new (...args: any[]) => T;

export class DddContext {
  private _txId!: string;

  get!: <T>(type: ClassType<T> | Token<T>) => T;

  set!: <T>(type: ClassType<T> | Token<T>, instance: T) => void;

  dispose: () => void;

  container!: ContainerInstance;

  constructor(txId: string) {
    this._txId = txId;

    const containerId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-', 10)();

    this.dispose = () => {
      Container.reset(containerId);
    };

    this.container = Container.of(containerId);
    this.container.set(DddContext, this);

    this.get = (type) => this.container.get(type);

    this.set = (type, instance) => this.container.set(type, instance);
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
