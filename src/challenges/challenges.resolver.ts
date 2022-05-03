import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { operationArgs } from 'src/shared/operation-args';
import { ChallengesService } from './challenges.service';
import {
  AddChallengeInput,
  Challenge,
  returns,
  UpdateChallengeInput,
} from './dto/challenge.model';

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

  @Mutation(returns.challenge)
  async updateChallenge(
    @Args(operationArgs.id) id: number,
    @Args('challenge') challengeUpdates: UpdateChallengeInput,
  ): Promise<Challenge> {
    await this.challengesService.update(id, challengeUpdates);
    return this.challengesService.findById(id);
  }
}
