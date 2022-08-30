import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsService } from 'src/app/cms.service';
import { GiverService } from 'src/app/giver.service';
import { TastefullyService } from '../tastefully.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  debugUrl: string;
  loginFailed: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cms: CmsService,
    private giver: GiverService,
    private tastefully: TastefullyService
  ) { }

  async ngOnInit() {
    // this.debugUrl = window.location.href;

    // login logic here
    let queryParams = new URLSearchParams(window.location.search);
    let authtoken = queryParams.get("authtoken");
    let result = await this.giver.validateAuthToken(authtoken);

    // fake login for ease of testing purpose
    // let result = {
    //   result: "successful",
    //   memberID: "100",
    //   name: "Testing Customer",
    //   phone: "0199999999"
    // }

    let success = result && result.result == "successful";

    if (success) {
      let customers = await this.tastefully.getCustomers((ref) => ref.where("giverMemberId", "==", result.memberID));
      if (customers.length <= 0) {
        let table = await this.cms.getTable("customers");
        let customer = await this.tastefully.saveCustomer(table, {
          name: result.name,
          mobileNo: result.phone,
          giverMemberId: result.memberID
        })
        if (customer) {
          this.tastefully.CURRENT_CUSTOMER = customer;
        } else {
          this.loginFailed = true;
        }
      } else {
        this.tastefully.CURRENT_CUSTOMER = customers[0];
      }
      await this.tastefully.getAttributes();
      await this.router.navigate(["../home"], { relativeTo: this.route });
    } else {
      this.loginFailed = true;
    }

  }

}
