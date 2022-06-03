import { Test } from '@nestjs/testing';
import { FieldMapType } from 'src/decorators/field-map.types';
import { RelationsService } from './relations.service';

describe('RelationsService', () => {
  let service: RelationsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RelationsService],
    }).compile();

    service = module.get<RelationsService>(RelationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('constructRelations()', () => {
    it('should return an empty list if no relations are provided', () => {
      const result = service.constructRelations({});

      expect(result).toStrictEqual([]);
    });

    it("should return an empty list if the provided field map doesn't have truthy fields", () => {
      const fieldMap: FieldMapType = { first: null, second: null, third: null };

      const result = service.constructRelations(fieldMap);

      expect(result).toStrictEqual([]);
    });

    it('should return a list of relations if the provided field map has truthy fields', () => {
      const fieldMap: FieldMapType = { first: { second: null }, second: null };

      const result = service.constructRelations(fieldMap);

      expect(result).toStrictEqual(['first']);
    });

    it('should return nested relations', () => {
      const fieldMap: FieldMapType = { first: { second: { third: null } } };

      const result = service.constructRelations(fieldMap);

      expect(result).toStrictEqual(['first', 'first.second']);
    });

    it('should return a list of relations with a prefix', () => {
      const fieldMap: FieldMapType = { first: { second: null } };
      const prefix = 'prefix.';

      const result = service.constructRelations(fieldMap, [], prefix);

      expect(result).toStrictEqual(['prefix.first']);
    });

    it('should append new relations to provided list of relations', () => {
      const fieldMap: FieldMapType = { second: { third: null } };
      const relations = ['first'];
      const prefix = 'first.';

      service.constructRelations(fieldMap, relations, prefix);

      expect(relations).toStrictEqual(['first', 'first.second']);
    });
  });
});
