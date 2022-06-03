import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FieldNode } from 'graphql';
import { FieldMapType } from './field-map.types';

export const getNodeData = (node: FieldNode): FieldMapType => {
  const { selectionSet } = node || {};

  let fields = null;
  if (!!selectionSet) {
    fields = {};
    selectionSet.selections.forEach((selection: FieldNode) => {
      const name = selection.name.value;
      fields[name] = getNodeData(selection);
    });
  }

  return fields;
};

export const makeFieldMap = (
  _: unknown,
  ctx: ExecutionContext,
): FieldMapType => {
  const gqlCtx = GqlExecutionContext.create(ctx);
  const info = gqlCtx.getInfo();

  const node = info.fieldNodes[0];
  return getNodeData(node);
};

export const FieldMap = createParamDecorator(makeFieldMap);
