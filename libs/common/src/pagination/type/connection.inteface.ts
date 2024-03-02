import { EdgeInterface } from './edge.interface';
import { PageInfoInterface } from './pageInfo.interface';

export interface ConnectionInterface<T> {
  edges: EdgeInterface<T>[];
  pageInfo: PageInfoInterface;
}
