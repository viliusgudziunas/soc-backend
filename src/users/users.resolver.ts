import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }
}
