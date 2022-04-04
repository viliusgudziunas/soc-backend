import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column()
  lastName: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  isActive: boolean;
}
