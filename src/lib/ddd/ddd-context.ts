import { customAlphabet } from 'nanoid';
import { Container, Token } from 'typedi';
import { EntityManager } from 'typeorm';

type ClassType<T> = new (...args: any[]) => T;

export class DddContext {
  private _txId!: string;

  get!: <T>(type: ClassType<T> | Token<T>) => T;

  set!: <T>(type: ClassType<T> | Token<T>, instance: T) => void;

  constructor(txId: string) {
    this._txId = txId;

    const containerId = customAlphabet(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-',
      10,
    )();
    const container = Container.of(containerId);
    container.set(DddContext, this);
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
