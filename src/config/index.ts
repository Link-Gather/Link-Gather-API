import ormconfig from './ormconfig'
import { Store } from 'confidence'

const doc = {
  ormconfig,
}

const store = new Store(doc)

export const getConfig = (key: string) => store.get(key)
