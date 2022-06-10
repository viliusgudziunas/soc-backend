import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from 'src/decorators/field-map.decorator';
import { FieldMapType } from 'src/decorators/field-map.types';
import { RelationsService } from 'src/services/relations.service';
import { AddGroupInput, Group, UpdateGroupInput } from './group.entity';
import { GroupsService } from './groups.service';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly relationsService: RelationsService,
  ) {}

  @Query(Group.returns.groups)
  async groups(@FieldMap() fieldMap: FieldMapType): Promise<Group[]> {
    const relations = this.relationsService.constructRelations(fieldMap);
    return this.groupsService.findAll(relations);
  }

  @Query(Group.returns.group)
  async group(
    @FieldMap() fieldMap: FieldMapType,
    @Args(Group.args.id) id: number,
  ): Promise<Group> {
    const relations = this.relationsService.constructRelations(fieldMap);
    return this.groupsService.findById(id, relations);
  }

  @Mutation(Group.returns.group)
  async addGroup(
    @FieldMap() fieldMap: FieldMapType,
    @Args('group') group: AddGroupInput,
  ): Promise<Group> {
    const id = await this.groupsService.insert(group);

    const relations = this.relationsService.constructRelations(fieldMap);
    return this.groupsService.findById(id, relations);
  }

  @Mutation(Group.returns.group)
  async updateGroup(
    @FieldMap() fieldMap: FieldMapType,
    @Args(Group.args.id) id: number,
    @Args('group') group: UpdateGroupInput,
  ): Promise<Group> {
    await this.groupsService.update(id, group);

    const relations = this.relationsService.constructRelations(fieldMap);
    return this.groupsService.findById(id, relations);
  }
}
