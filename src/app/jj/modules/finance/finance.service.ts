import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FinanceService {
  depositChange: BehaviorSubject<boolean>;
  withdrawChange: BehaviorSubject<boolean>;

  constructor() {
    this.depositChange = new BehaviorSubject(null);
    this.withdrawChange = new BehaviorSubject(null);
  }
}
