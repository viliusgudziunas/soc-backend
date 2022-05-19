import { Args, Query, Resolver } from '@nestjs/graphql';
import { Group } from './group.entity';
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
}
