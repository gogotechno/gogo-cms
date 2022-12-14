import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJUser } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

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
    private menuCtrl: MenuController,
    private auth: AuthService,
    private core: CoreService,
  ) {
    super();
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async (queryParams) => {
      if (queryParams.refresh) {
        await this.loadData();
      }
    });
    await this.loadData();
  }

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }

  async loadData() {
    this.usersPage = this.defaultPage;
    this.merchantId = await this.auth.findMyMerchantId();
    this.users = await this.getUsers();
    this.usersEnded = this.users.length < this.usersPage.itemsPerPage;
  }

  async getUsers() {
    const users = await this.core.getUsers(this.usersPage, {
      merchant_id: this.merchantId,
      merchant_id_type: '=',
    });
    return users;
  }

  async loadMoreUsers(event: Event) {
    this.usersPage.currentPage += 1;
    const incoming = await this.getUsers();
    this.users = [...this.users, ...incoming];
    this.usersEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}
