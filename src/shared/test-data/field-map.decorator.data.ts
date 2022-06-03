import { FieldNode, Kind } from 'graphql';

export const fieldNode: FieldNode = {
  kind: Kind.FIELD,
  name: { kind: Kind.NAME, value: 'Test node' },
};

export const fieldNodeWithEmptySelections: FieldNode = {
  ...fieldNode,
  selectionSet: { kind: Kind.SELECTION_SET, selections: [] },
};

export const selections: FieldNode[] = [
  { ...fieldNode, name: { kind: Kind.NAME, value: 'Test node 1' } },
  { ...fieldNode, name: { kind: Kind.NAME, value: 'Test node 2' } },
  { ...fieldNode, name: { kind: Kind.NAME, value: 'Test node 3' } },
];

export const fieldNodeWithSelections: FieldNode = {
  ...fieldNode,
  selectionSet: { kind: Kind.SELECTION_SET, selections },
};

export const fieldMap = {
  'Test node 1': null,
  'Test node 2': null,
  'Test node 3': null,
};

export const nestedSelections: FieldNode[] = [
  ...selections,
  {
    ...fieldNode,
    name: { kind: Kind.NAME, value: 'Test node 4' },
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          ...fieldNode,
          name: { kind: Kind.NAME, value: 'Nested test node 1' },
        },
      ],
    },
  },
];

export const fieldNodeWithNestedSelections: FieldNode = {
  ...fieldNode,
  selectionSet: { kind: Kind.SELECTION_SET, selections: nestedSelections },
};

export const fieldMapWithNestedSelections = {
  'Test node 1': null,
  'Test node 2': null,
  'Test node 3': null,
  'Test node 4': { 'Nested test node 1': null },
};
