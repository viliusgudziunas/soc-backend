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

  findAll(relations: string[]): Promise<Group[]> {
    return this.groupsRepository.find({ relations });
  }

  findById(id: number, relations: string[]): Promise<Group> {
    return this.groupsRepository.findOneOrFail(id, { relations });
  }

  async insert(params: GroupParams): Promise<number> {
    const group = new Group(params);

    const result = await this.groupsRepository.insert(group);
    return result.identifiers[0].id;
  }

  async update(id: number, params: Partial<GroupParams>): Promise<void> {
    const partialEntity = { ...params };
    await this.groupsRepository.update(id, partialEntity);
  }
}
