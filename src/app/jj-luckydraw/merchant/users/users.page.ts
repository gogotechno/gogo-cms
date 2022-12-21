import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJUser } from '../../jj-luckydraw.type';
import { CreateUserPage } from '../create-user/create-user.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  loaded: boolean;
  myMerchantId: number;
  userPagination: Pagination;
  users: JJUser[];
  noMoreUsers: boolean;

  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, private lucky: JJLuckydrawService) {
    // this.lucky.usersChange.subscribe((ev) => {
    //   if (ev?.beUpdated) {
    //     this.loadData();
    //   }
    // });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((queryParam) => {
      if (queryParam?.refresh) {
        this.loadData();
      }
    });

    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreUsers = false;
    this.myMerchantId = await this.lucky.getMyMerchantId();
    await this.loadUsers();
    this.loaded = true;
  }

  async loadUsers() {
    this.userPagination = {
      itemsPerPage: 10,
      currentPage: 1,
    };

    this.users = await this.lucky.getUsersByMerchant(this.myMerchantId, this.userPagination);
    this.noMoreUsers = this.users.length < this.userPagination.itemsPerPage;
  }

  async loadMoreUsers(event: Event) {
    const infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.userPagination.currentPage += 1;
    const users = await this.lucky.getUsersByMerchant(this.myMerchantId, this.userPagination);
    this.users = [...this.users, ...users];
    this.noMoreUsers = users.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    const refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onCreateUser() {
    const modal = await this.modalCtrl.create({
      component: CreateUserPage,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      this.loadData();
    }
  }
}
