import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.page.html',
  styleUrls: ['./merchant.page.scss'],
})
export class MerchantPage implements OnInit {

  private readonly ROOT_PATH = "/jj-luckydraw/merchant";
  activePage: string

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.defaultRouting();
  }

  ionViewWillEnter(){
    if(this.activePage) this.navigate(this.activePage);
    else { this.activePage = 'dashboard'; this.defaultRouting(); }
  }

  /**
   * Use this to navigate to root path. 
   * 
   * Instead of using root path in routing module like below example,
   * which will cause navigate to root path everytime switching page
   * ```
   * {
   *    path: '',
   *    redirectTo: 'dashboard',
   *    pathMatch: 'full'
   * }
   * ```
   * 
   * This method will only run once after initialization.
   */
  defaultRouting() {
    let navigateTo = this.router.url == this.ROOT_PATH ? `${this.ROOT_PATH}/dashboard` : this.router.url;
    this.router.navigate([navigateTo]);
  }

  /**
   * Use this to switch navigation within menu item.
   * 
   * routerLink do not work as expected.
   * ```
   * routerLink="./dashboard"
   * ```
   * 
   * The expected result is navigate to each page properly but the actual 
   * result is the first navigation works and the continuous navigation do 
   * not works, it keeps staying in same page. 
   * 
   * Probably is routing configuration issue but cannot find the root cause.
   * This is a temporary solve, removed this if better solution found.
   * 
   * @param url Target URL
   */
  navigate(url: string) {
    this.activePage = url;
    this.router.navigate(['/jj-luckydraw/merchant/', url], {
      replaceUrl: true,
      relativeTo: this.route
    });
  }

}
