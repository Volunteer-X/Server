import { ConnectionInterface } from './connection.inteface';
import { Edge } from './edge';
import { PageInfo } from './pageInfo';

export class Connection<T> implements ConnectionInterface<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}
