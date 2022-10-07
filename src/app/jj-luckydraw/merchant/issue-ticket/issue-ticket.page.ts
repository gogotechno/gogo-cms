import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JjLuckydrawService } from '../../jj-luckydraw.service';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.page.html',
  styleUrls: ['./issue-ticket.page.scss'],
})
export class IssueTicketPage implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private jjLuckydraw: JjLuckydrawService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    let merchant = await this.jjLuckydraw.getMyMerchant();
    let event = await this.jjLuckydraw.getLastestEvent();

    this.formGroup = this.fb.group({
      event_id: [event.doc_id, [Validators.required]],
      billNo: ['', [Validators.required]],
      customerContactNo: ['', [Validators.required]],
      customerFirstName: ['', [Validators.required]],
      customerLastName: ['', [Validators.required]],
      merchant_id: [merchant.doc_id, [Validators.required]],
      ticketCount: ['', [Validators.required]],
    });
    console.log(this.formGroup.value);
  }

  onIssueTicket(event?) {
    if (this.formGroup.invalid) {
      return;
    }
    let formGroupValue = this.formGroup.value;
    this.jjLuckydraw.issueTickets(formGroupValue);
  }

}
