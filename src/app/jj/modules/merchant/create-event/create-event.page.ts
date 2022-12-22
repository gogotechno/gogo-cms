import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  form: CmsForm;
  event: any;
  eventId: number;

  constructor(private route: ActivatedRoute, private appUtils: AppUtils,private app: AppUtils,) { }

  ngOnInit() { 
    this.form = this.createEventForm;
    this.event = {
      a: '1',
      b: '2',
      c: "3",
    }
    const params = this.route.snapshot.params;
    this.eventId = params.id;
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CREATE_EVENTS');
    if (!confirm) return;
    console.log(data);
  }

  createEventForm: CmsForm = {
    code: 'create-event',
    labelPosition: 'stacked',
    submitButtonText: '_CREATE',
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
        type: 'number',
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
      },
      {
        code: 'highlight',
        label: {
          en: 'Highlight',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      },
      {
        code: 'description',
        label: {
          en: 'Description',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      },
      {
        code: 'tnc',
        label: {
          en: 'Terms & Conditions',
          zh: '',
          ms: '',
        },
        type: 'textarea',
        required: true,
      },
      {
        code: 'status',
        label: {
          en: 'Status',
          zh: '',
          ms: '',
        },
        options: [
          {
            code: "1",
            label: "_"
          },
          {
            code: "2",
            label: "_"
          },
          {
            code: "3",
            label: "_"
          }
        ],
        type: 'text',
        required: true,
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
        required: true,
      },
      {
        code: 'drawAt',
        label: {
          en: 'Draw At',
          zh: '',
          ms: '',
        },
        type: 'date',
        required: true,
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
        required: true,
      },
      {
        code: 'serialNoPostfix',
        label: {
          en: 'Postfix',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      },
      {
        code: 'serialNoSeqLength',
        label: {
          en: 'Length',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      },
      {
        code: 'serialNoSeqPadStr',
        label: {
          en: 'PadStr',
          zh: '',
          ms: '',
        },
        type: 'text',
        required: true,
      },
      {
        code: 'ticketMethod',
        label: {
          en: 'Ticket Method',
          zh: '',
          ms: '',
        },
        options: [
          {
            code: "1",
            label: "_"
          },
          {
            code: "2",
            label: "_"
          },
          {
            code: "3",
            label: "_"
          }
        ],
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
        required: true,
      },
      {
        code: 'thumbnailImage',
        label: {
          en: 'Thumbnail Image',
          zh: '',
          ms: '',
        },
        type: 'files',
        required: true,
      }, 
    ],
}
}
