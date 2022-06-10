import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from 'src/decorators/field-map.decorator';
import { FieldMapType } from 'src/decorators/field-map.types';
import { RelationsService } from 'src/services/relations.service';
import {
  AddChallengeInput,
  Challenge,
  UpdateChallengeInput,
} from './challenge.entity';
import { ChallengesService } from './challenges.service';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly relationsService: RelationsService,
  ) {}

  @Query(Challenge.returns.challenges)
  async challenges(@FieldMap() fieldMap: FieldMapType): Promise<Challenge[]> {
    const relations = this.relationsService.constructRelations(fieldMap);
    return this.challengesService.findAll(relations);
  }

  @Query(Challenge.returns.challenge)
  async challenge(
    @FieldMap() fieldMap: FieldMapType,
    @Args(Challenge.args.id) id: number,
  ): Promise<Challenge> {
    const relations = this.relationsService.constructRelations(fieldMap);
    return this.challengesService.findById(id, relations);
  }

  @Mutation(Challenge.returns.challenge)
  async addChallenge(
    @FieldMap() fieldMap: FieldMapType,
    @Args('challenge') challenge: AddChallengeInput,
  ): Promise<Challenge> {
    const id = await this.challengesService.insert(challenge);

    const relations = this.relationsService.constructRelations(fieldMap);
    return this.challengesService.findById(id, relations);
  }

  @Mutation(Challenge.returns.challenge)
  async updateChallenge(
    @FieldMap() fieldMap: FieldMapType,
    @Args(Challenge.args.id) id: number,
    @Args('challenge') challenge: UpdateChallengeInput,
  ): Promise<Challenge> {
    await this.challengesService.update(id, challenge);

    const relations = this.relationsService.constructRelations(fieldMap);
    return this.challengesService.findById(id, relations);
  }
}
