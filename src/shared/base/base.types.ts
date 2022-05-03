import { EntityBase } from './base.entity';

export type EntityParams<T> = Omit<T, keyof EntityBase<T>>;
