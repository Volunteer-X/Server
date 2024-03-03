import { EdgeInterface } from './edge.interface';
import { IPageInfo } from './pageInfo';

export interface ConnectionInterface<T> {
  edges: EdgeInterface<T>[];
  pageInfo: IPageInfo;
}
