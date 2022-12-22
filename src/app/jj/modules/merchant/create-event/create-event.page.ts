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

  constructor(private route: ActivatedRoute, private app: AppUtils) { }

  ngOnInit() {
    this.form = this.createEventForm;
    const params = this.route.snapshot.params;
    this.eventId = params.id;
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CREATE_EVENTS');
    if (!confirm) {
      return;
    }
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
        label: {
          en: 'Ticket Method',
          zh: '',
          ms: '',
        },
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
        code: 'Prizes',
        label: {
          en: 'Prizes',
          zh: '',
          ms: '',
        },
        type: 'text',
        // buttons: onSubmit(),
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
