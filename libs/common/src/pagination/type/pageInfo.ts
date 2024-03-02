import { PageInfoInterface } from './pageInfo.interface';

export class PageInfo implements PageInfoInterface {
  constructor(
    public hasNextPage: boolean,
    public endCursor: string,
  ) {}
}
