import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { EntityBase } from 'src/shared/entity-base/entity-base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('exercises')
export class Exercise extends EntityBase<Exercise> {
  @Field()
  @Column()
  readonly name: string;

  @Field(() => Int)
  @Column()
  readonly calories: number;

  @Field(() => Int)
  @Column()
  readonly timeSpentInMinutes: number;
}

export const returns = {
  exercise: (): ReturnTypeFuncValue => Exercise,
  exercises: (): ReturnTypeFuncValue => [Exercise],
};

@InputType()
export class AddExerciseInput extends OmitType(
  Exercise,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}

@InputType()
export class UpdateExerciseInput extends PartialType(AddExerciseInput) {}
