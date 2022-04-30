import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChallengeParams } from './challenges.types';

@ObjectType()
@Entity('challenges')
export class Challenge {
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

  @Field()
  @Column()
  readonly description: string;

  @Field()
  @Column({ default: true })
  readonly active: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readonly endDate?: Date;

  constructor(params: ChallengeParams) {
    Object.assign(this, params);
  }
}

export const returns = {
  challenge: () => Challenge,
  challenges: () => [Challenge],
};
