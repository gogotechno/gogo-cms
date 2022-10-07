import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsService } from 'src/app/cms.service';
import { GiverService, GiverValidationResponse } from 'src/app/giver.service';
import { TastefullyService } from '../tastefully.service';
import { TastefullyCustomer } from '../tastefully.type';

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
    // let result: GiverValidationResponse = {
    //   result: "successful",
    //   memberID: "TESTING_CUSTOMER",
    //   name: "Testing Customer",
    //   email: "TESTING_CUSTOMER",
    //   phone: "TESTING_CUSTOMER",
    //   dob: "1999-01-01",
    //   gender: "M",
    //   language: "en",
    //   systemLanguage: "en",
    //   isHalal: false
    // }

    let success = result && result.result == "successful";
    if (success) {
      let customerForm: TastefullyCustomer = {
        giverMemberId: result.memberID,
        name: result.name,
        email: result.email,
        mobileNo: result.phone,
        gender: result.gender,
        dob: result.dob
      }
      let customers = await this.tastefully.getCustomers((ref) => ref.where("giverMemberId", "==", result.memberID));
      let table = await this.cms.getTable("customers");
      if (customers.length <= 0) {
        let customer = await this.tastefully.saveCustomer(table, customerForm)
        if (customer) {
          this.tastefully.CURRENT_CUSTOMER = customer;
        } else {
          this.loginFailed = true;
        }
      } else {
        let customer = customers[0];
        let updated = await this.tastefully.saveCustomer(table, customerForm, customer[table.codeField]);
        if (updated) {
          this.tastefully.CURRENT_CUSTOMER = updated;
        } else {
          this.loginFailed = true;
        }
      }
      await this.tastefully.getAttributes();
      await this.router.navigate(["../home"], { relativeTo: this.route });
    } else {
      this.loginFailed = true;
    }

  }

}
