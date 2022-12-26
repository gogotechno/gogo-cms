import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from 'src/app/jj-luckydraw/auth.service';
import { UserType } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { CoreService } from 'src/app/jj/services';
import { MiniProgram } from 'src/app/jj/typings';
import { Conditions, Pagination } from 'src/app/sws-erp.type';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'mini-programs',
  templateUrl: './mini-programs.component.html',
  styleUrls: ['./mini-programs.component.scss'],
})
export class MiniProgramsComponent implements OnInit {
  miniPrograms: MiniProgram[];
  accountsEnded: boolean;
  miniProgramsId: number;
  customerId: number;
  merchantId: number;

  constructor(
    private home: HomeService,
    private appUtils: AppUtils,
    private auth: AuthService,
    private core: CoreService,) 
    {
    
  }

  async ngOnInit() {
    // this.home.miniPrograms.subscribe((miniPrograms) => (this.miniPrograms = miniPrograms));
    await this.loadData();
  } 

  async loadData() {
    this.miniPrograms = await this.getMiniPrograms();
    console.log(this.miniPrograms);
  }

  async getMiniPrograms() {
    let conditions: Conditions = {};
    if (this.customerId) {
      conditions.customer_id = this.customerId;
    }
    if (this.merchantId) {
      conditions.merchant_id = this.merchantId;
    }
    let miniprograms = await this.core.getMiniPrograms();
    return miniprograms;
  }
}
