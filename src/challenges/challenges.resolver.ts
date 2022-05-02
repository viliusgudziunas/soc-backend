import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { operationArgs } from 'src/shared/operation-args';
import { AddChallengeInput, Challenge, returns } from './challenge.entity';
import { ChallengesService } from './challenges.service';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Query(returns.challenges)
  async challenges(): Promise<Challenge[]> {
    return this.challengesService.findAll();
  }

  @Query(returns.challenge)
  async challenge(@Args(operationArgs.id) id: number): Promise<Challenge> {
    return this.challengesService.findById(id);
  }

  @Mutation(returns.challenge)
  async addChallenge(
    @Args('challenge') challenge: AddChallengeInput,
  ): Promise<Challenge> {
    const id = await this.challengesService.insert(challenge);
    return this.challengesService.findById(id);
  }
}
