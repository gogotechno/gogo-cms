import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage extends SharedComponent implements OnInit {
  eventId: number;
  event: JJEvent;
  form: CmsForm;

  constructor(private route: ActivatedRoute, private core: CoreService, private date: DatePipe, private app: AppUtils) {
    super();
  }

  async ngOnInit() {
    this.form = this.updateEventForm;
    const params = this.route.snapshot.params;
    this.eventId = params['id'];
    await this.loadData();
  }

  async loadData() {
    this.event = await this.core.getEventById(this.eventId);
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CREATE_EVENTS');
    if (!confirm) {
      return;
    }
    console.log(data);
  }

  updateEventForm: CmsForm = {
    code: 'update-event',
    labelPosition: 'stacked',
    submitButtonText: '_UPDATE',
    // autoValidate: true,
    autoRemoveUnusedKeys: 'swserp',
    items: [
      {
        code: 'merchant_id',
        label: {
          en: 'Merchant',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      },
      {
        code: 'name',
        label: {
          en: 'Name',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      }, {
        code: 'status',
        label: {
          en: 'Status',
          zh: '',
          ms: '',
        },
        options: [
          {
            code: "Active",
            label: "Active"
          },
          {
            code: "Inactive",
            label: "Inactive"
          },
          {
            code: "Ended",
            label: "Ended"
          }
        ],
        type: 'select',
        required: true,
      },
      {
        code: 'highlight',
        label: {
          en: 'Highlight',
          zh: '',
          ms: '',
        },
        type: 'cms-translate',
        required: false,
      },
      {
        code: 'description',
        label: {
          en: 'Description',
          zh: '',
          ms: '',
        },
        type: 'cms-translate-editor',
        required: false,
      },
      {
        code: 'tnc',
        label: {
          en: 'Terms & Conditions',
          zh: '',
          ms: '',
        },
        type: 'cms-translate-editor',
        required: false,
      },

      {
        code: 'startAt',
        label: {
          en: 'Start At',
          zh: '',
          ms: '',
        },
        type: 'date',
        required: true,
      },
      {
        code: 'endAt',
        label: {
          en: 'End At',
          zh: '',
          ms: '',
        },
        type: 'date',
        required: false,
      },
      {
        code: 'drawAt',
        label: {
          en: 'Draw At',
          zh: '',
          ms: '',
        },
        type: 'date',
        required: false,
      },
      {
        code: 'minSpend',
        label: {
          en: 'Min Spend',
          zh: '',
          ms: '',
        },
        type: 'number',
        required: true,
      },
      {
        code: 'serialNoPrefix',
        label: {
          en: 'Prefix',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: false,
      },
      {
        code: 'serialNoPostfix',
        label: {
          en: 'Postfix',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: false,
      },
      {
        code: 'serialNoSeqLength',
        label: {
          en: 'Length',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: false,
      },
      {
        code: 'serialNoSeqPadStr',
        label: {
          en: 'PadStr',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: false,
      },
      {
        code: 'ticketMethod',
        label: "jj._TICKET_METHOD",
        options: [
          {
            code: "_RANDOM_CHAR",
            label: "_RANDOM_CHAR"
          },
          {
            code: "_SEQUENCE",
            label: "_SEQUENCE"
          }
        ],
        type: 'text',
        required: true,
      },
      {
        code: 'prizes',
        label: {
          en: 'prizes',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      },
      {
        code: 'backgroundImage',
        label: {
          en: 'Background Image',
          zh: '',
          ms: '',
        },
        type: 'files',
        required: false,
      },
      {
        code: 'thumbnailImage',
        label: {
          en: 'Thumbnail Image',
          zh: '',
          ms: '',
        },
        type: 'files',
        required: false,
      },
    ],
  }

}