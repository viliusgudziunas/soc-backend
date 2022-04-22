import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
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
  readonly id: number;
  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;
  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column()
  readonly name: string;

  @Field(() => Int)
  @Column()
  readonly calories: number;

  @Field(() => Int)
  @Column()
  readonly timeSpentInMinutes: number;

  constructor(params: ExerciseParams) {
    Object.assign(this, params);
  }
}

@InputType()
export class AddExerciseInput extends OmitType(
  Exercise,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
