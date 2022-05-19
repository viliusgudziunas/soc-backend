import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupParams } from './groups.types';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  findById(id: number): Promise<Group> {
    return this.groupsRepository.findOneOrFail(id);
  }

  async insert(params: GroupParams): Promise<number> {
    const group = new Group(params);

    const result = await this.groupsRepository.insert(group);
    return result.identifiers[0].id;
  }
}
