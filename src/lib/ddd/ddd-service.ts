import { Inject } from 'typedi';
import { DddContext } from './ddd-context';

export class DddService {
  @Inject()
  context!: DddContext;
}
