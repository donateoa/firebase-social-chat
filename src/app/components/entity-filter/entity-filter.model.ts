import {PAGE_SIZE} from 'src/app.constants';

export const enum OperatorType {
  EQUAL = '==',
  GREATER = '>',
  GREATER_AND_INCLUDE = '>=',
  MINOR = '<',
  MINOR_AND_INCLUDE = '<='
}
export interface IFilter {
  field?: string;
  operator?: OperatorType;
  value?: any;
  sort?: SortType;
  pageSize?: number;
}
export const enum SortType {
  DESC = 'desc',
  ASC = 'asc',
}

export class Filter implements IFilter {
  constructor(
      field?: string, operator?: OperatorType, value?: any, sort?: SortType,
      public pageSize?: number) {
    if (!pageSize) {
      this.pageSize = PAGE_SIZE;
    }
  }
}
