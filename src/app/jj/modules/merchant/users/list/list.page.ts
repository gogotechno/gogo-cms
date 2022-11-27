import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JJUser } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { DocStatus, Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  usersPage: Pagination;
  usersEnded: boolean;
  users: JJUser[];
  merchantId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private core: CoreService,
  ) {
    super();
  }

  async ngOnInit() {
    // this.route.queryParams.subscribe(async (queryParams) => {
    //   if (queryParams?.refresh) {
    //     await this.loadData();
    //     await this.router.navigate([]);
    //   }
    // });

    await this.loadData();
  }

  async loadData() {
    console.log('loadData');
    this.usersPage = this.defaultPage;
    this.merchantId = await this.auth.findMyMerchantId();
    this.users = await this.getUsers();
    this.usersEnded = this.users.length < this.usersPage.itemsPerPage;
  }

  async getUsers() {
    let users = await this.core.getUsers(this.usersPage, {
      merchant_id: this.merchantId,
      merchant_id_type: '=',
    });
    return users;
  }

  async loadMoreUsers(event: Event) {
    this.usersPage.currentPage += 1;
    let incoming = await this.getUsers();
    this.users = [...this.users, ...incoming];
    this.usersEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}
