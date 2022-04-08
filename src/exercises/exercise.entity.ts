import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('exercises')
export class Exercise {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Field({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;
  @Field({ nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: false })
  @Column()
  name: string;

  @Field(() => Int, { nullable: false })
  @Column()
  calories: number;

  @Field(() => Int, { nullable: false })
  @Column()
  timeSpentInMinutes: number;
}
