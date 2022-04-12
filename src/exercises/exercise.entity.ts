import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExerciseParams } from './exercise.types';

@ObjectType()
@Entity('exercises')
export class Exercise {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @CreateDateColumn()
  createdAt: Date;
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  calories: number;

  @Field(() => Int)
  @Column()
  timeSpentInMinutes: number;

  constructor(params: ExerciseParams) {
    Object.assign(this, params);
  }
}
