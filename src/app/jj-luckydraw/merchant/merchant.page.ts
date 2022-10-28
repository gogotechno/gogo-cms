import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export const MERCHANT_ROOT_PATH = '/jj-luckydraw/merchant';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.page.html',
  styleUrls: ['./merchant.page.scss'],
})
export class MerchantPage implements OnInit {
  currentUrl: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.defaultRouting();
  }

  ionViewWillEnter() {
    if (this.currentUrl) {
      this.navigate(this.currentUrl);
    }
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
    if (this.router.url == MERCHANT_ROOT_PATH) {
      this.navigate('dashboard');
    } else {
      let rootPaths = MERCHANT_ROOT_PATH.split('/');
      let paths = this.router.url.split('/');
      let pathsWithoutRoot = paths.filter((p) => !rootPaths.includes(p));
      this.currentUrl = pathsWithoutRoot[0];
    }
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
   * This is a temporary solve, remove this if better solution found.
   *
   * @param url Target URL
   */
  navigate(url: string) {
    this.currentUrl = url;
    this.router.navigate([MERCHANT_ROOT_PATH, url], {
      replaceUrl: true,
      relativeTo: this.route,
    });
  }
}
