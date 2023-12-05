import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Transaction } from 'neo4j-driver';
import { Observable, catchError, tap } from 'rxjs';
import { Neo4jCommonService } from './neo4j.service';

@Injectable()
export class Neo4jTransactionInterceptor implements NestInterceptor {
  constructor(private readonly neo4jService: Neo4jCommonService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const transaction: Transaction = this.neo4jService.beginTransaction();

    context.switchToRpc().getContext().transaction = transaction;

    return next.handle().pipe(
      tap(() => transaction.commit()),
      catchError((err) => {
        transaction.rollback();
        throw err;
      }),
    );
  }
}
