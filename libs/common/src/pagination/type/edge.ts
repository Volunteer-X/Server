import { EdgeInterface } from './edge.interface';
export class Edge<T> implements EdgeInterface<T> {
  node: T;
  cursor: string;

  constructor(node: T, cursor: string) {
    this.node = node;
    this.cursor = cursor;
  }
}
