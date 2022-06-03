import { Injectable } from '@nestjs/common';
import { FieldMapType } from 'src/decorators/field-map.types';

@Injectable()
export class RelationsService {
  constructRelations = (
    fieldMap: FieldMapType,
    relations: string[] = [],
    prefix = '',
  ): string[] => {
    Object.entries(fieldMap)
      .filter(([_, value]) => !!value)
      .forEach(([key, value]) => {
        const relation = prefix + key;
        relations.push(relation);

        const nextPrefix = relation + '.';
        this.constructRelations(value, relations, nextPrefix);
      });

    return relations;
  };
}
