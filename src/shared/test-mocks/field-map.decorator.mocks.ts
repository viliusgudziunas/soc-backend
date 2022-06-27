import * as fieldMapFunctions from 'src/decorators/field-map.decorator';
import { FieldMapType } from 'src/decorators/field-map.types';

export const mockGetNodeData = (
  returnValue: FieldMapType = {},
): jest.SpyInstance =>
  jest.spyOn(fieldMapFunctions, 'getNodeData').mockReturnValue(returnValue);
