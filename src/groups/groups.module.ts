import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsService } from 'src/services/relations.service';
import { Group } from './group.entity';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupsResolver, GroupsService, RelationsService],
})
export class GroupsModule {}
