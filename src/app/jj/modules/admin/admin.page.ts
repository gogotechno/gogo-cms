import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  modules = [
    {
      name: 'Sales',
      icon: 'star',
      link: '/jj/admin/modules/sales'
    },
    {
      name: 'CRM',
      icon: 'star',
      link: '/jj/admin/crm'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHome(event?) {
    this.router.navigateByUrl('/jj', {});
  }

}
