import { Query, Resolver } from '@nestjs/graphql';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(Group.returns.groups)
  async groups(): Promise<Group[]> {
    return this.groupsService.findAll();
  }
}
