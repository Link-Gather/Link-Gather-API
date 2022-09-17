import { DataSource } from 'typeorm';
import { getConfig } from '../../config';
import entities from '../../entities';
const ormConfig = getConfig('/ormconfig');

export const db = new DataSource({ ...ormConfig, entities });
