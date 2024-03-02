import { EdgeInterface } from './edge.interface';
import { PageInfo } from './pageInfo';

export interface ConnectionInterface<T> {
  edges: EdgeInterface<T>[];
  pageInfo: PageInfo;
}
