import { EntityBase } from './entity-base.entity';

export type EntityParams<T> = Omit<T, keyof EntityBase<T>>;
