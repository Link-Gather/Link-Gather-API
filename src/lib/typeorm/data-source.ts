import { DataSource } from 'typeorm';
import { getConfig } from '../../config';
const ormConfig = getConfig('/ormconfig');

export const db = new DataSource({ ...ormConfig, entities:["src/services/*/domain/model.ts"] });
