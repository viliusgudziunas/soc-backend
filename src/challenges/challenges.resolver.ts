import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AddChallengeInput,
  Challenge,
  UpdateChallengeInput,
} from './challenge.entity';
import { ChallengesService } from './challenges.service';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Query(Challenge.returns.challenges)
  async challenges(): Promise<Challenge[]> {
    return this.challengesService.findAll();
  }

  @Query(Challenge.returns.challenge)
  async challenge(@Args(Challenge.args.id) id: number): Promise<Challenge> {
    return this.challengesService.findById(id);
  }

  @Mutation(Challenge.returns.challenge)
  async addChallenge(
    @Args('challenge') challenge: AddChallengeInput,
  ): Promise<Challenge> {
    const id = await this.challengesService.insert(challenge);
    return this.challengesService.findById(id);
  }

  @Mutation(Challenge.returns.challenge)
  async updateChallenge(
    @Args(Challenge.args.id) id: number,
    @Args('challenge') challengeUpdates: UpdateChallengeInput,
  ): Promise<Challenge> {
    await this.challengesService.update(id, challengeUpdates);
    return this.challengesService.findById(id);
  }
}
