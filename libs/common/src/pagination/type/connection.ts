import { ConnectionInterface } from './connection.inteface';
import { EdgeInterface } from './edge.interface';
import { PageInfoInterface } from './pageInfo.interface';

export class Connection<T> implements ConnectionInterface<T> {
  edges: EdgeInterface<T>[];
  pageInfo: PageInfoInterface;
}
