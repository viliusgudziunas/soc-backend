import { Query, Resolver } from '@nestjs/graphql';
import { Challenge } from './challenge.entity';
import { ChallengesService } from './challenges.service';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Query(() => [Challenge])
  async challenges(): Promise<Challenge[]> {
    return this.challengesService.findAll();
  }
}
