import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddGroupInput, Group, UpdateGroupInput } from './group.entity';
import { GroupsService } from './groups.service';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(Group.returns.groups)
  async groups(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @Query(Group.returns.group)
  async group(@Args(Group.args.id) id: number): Promise<Group> {
    return this.groupsService.findById(id);
  }

  @Mutation(Group.returns.group)
  async addGroup(@Args('group') group: AddGroupInput): Promise<Group> {
    const id = await this.groupsService.insert(group);
    return this.groupsService.findById(id);
  }

  @Mutation(Group.returns.group)
  async updateGroup(
    @Args(Group.args.id) id: number,
    @Args('group') group: UpdateGroupInput,
  ): Promise<Group> {
    await this.groupsService.update(id, group);
    return this.groupsService.findById(id);
  }
}
