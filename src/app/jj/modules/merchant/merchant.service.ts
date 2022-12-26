import { Injectable } from '@angular/core';
import { CmsForm } from 'src/app/cms.type';

@Injectable()
export class MerchantService {
  constructor() {}

  get eventPrizeForm(): CmsForm {
    return {
      code: 'eventPrize',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items:[
          {
            code: 'name',
            label: 'jj._NAME',
            type: 'text',
            required: true,
          },
          {
            code: 'worth',
            label: 'jj._WORTH',
            type: 'number',
            required: true,
          },
          {
            code: 'quantity',
            label: 'jj._QUANTITY',
            type: 'number',
          },
          {
            code: 'level',
            label: 'jj._LEVEL',
            type: 'number',
          },
          {
            code: 'thumbnail_image',
            label: 'jj._THUMBNAIL_IMAGE',
            type: 'files',
          },
        ],
    }
  }

  get eventPointForm(): CmsForm {
    return {
      code: 'eventPoint',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items:[
          {
            code: 'minimum_spend',
            label: 'jj._MIN_SPEND',
            type: 'number',
            required: true,
          },
          {
            code: 'free_point',
            label: 'jj._FREE_POINT',
            type: 'number',
            required: true,
          },
          {
            code: 'vaild_from',
            label: 'jj._VAILD_FROM',
            type: 'date',
          },
          {
            code: 'vaild_to',
            label: 'jj._VAILD_TO',
            type: 'date',
          },
          {
            code: 'priority',
            label: 'jj._PRIORITY',
            type: 'number',
            required: true,
          },
          {
            code: 'isActive',
            label: 'jj._IS_ACTIVE',
            type: 'checkbox',
          },
          {
            code: 'issue_mode',
            label: 'jj._ISSUE_MODE',
            options: [
              {
                code: 'amount',
                label: 'jj._AMOUNT_ONLY',
              },
              {
                code: 'amount&point',
                label: 'jj._AMOUNT_AND_POINT',
              },
            ],
            type: 'select',
            required: true,
          },
        ],
    }
  }

  get eventSNWForm(): CmsForm {
    return {
      code: 'eventSNW',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items:[
          {
            code: 'minimum_spend',
            label: 'jj._MIN_SPEND',
            type: 'number',
            required: true,
          },
          {
            code: 'free_tickets',
            label: 'jj._FREE_TICKETS',
            type: 'number',
            required: true,
          },
          {
            code: 'vaild_from',
            label: 'jj._VAILD_FROM',
            type: 'date',
          },
          {
            code: 'vaild_to',
            label: 'jj._VAILD_TO',
            type: 'date',
          },
          {
            code: 'priority',
            label: 'jj._PRIORITY',
            type: 'number',
            required: true,
          },
          {
            code: 'isActive',
            label: 'jj._IS_ACTIVE',
            type: 'checkbox',
          },
          {
            code: 'issue_mode',
            label: 'jj._ISSUE_MODE',
            options: [
              {
                code: 'amount',
                label: 'jj._AMOUNT_ONLY',
              },
              {
                code: 'amount&point',
                label: 'jj._AMOUNT_AND_POINT',
              },
            ],
            type: 'select',
            required: true,
          },
        ],
    }
  }


  get eventForm(): CmsForm {
    return {
      code: 'event',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'merchant_id',
          label: 'jj._MERCHANT',
          type: 'text',
          required: true,
        },
        {
          code: 'name',
          label: 'jj._NAME',
          type: 'text',
          required: true,
        },
        {
          code: 'status',
          label: 'jj._STATUS',
          options: [
            {
              code: 'Active',
              label: 'jj._ACTIVE',
            },
            {
              code: 'Inactive',
              label: 'jj._INACTIVE',
            },
            {
              code: 'Ended',
              label: 'jj._ENDED',
            },
          ],
          type: 'select',
          required: true,
        },
        {
          code: 'highlight',
          label: 'jj._HIGHLIGHT',
          type: 'cms-translate',
          required: false,
        },
        {
          code: 'description',
          label: 'jj._DESCRIPTION',
          type: 'cms-translate-editor',
          required: false,
        },
        {
          code: 'tnc',
          label: 'jj._TNC',
          type: 'cms-translate-editor',
          required: false,
        },
  
        {
          code: 'startAt',
          label: 'jj._START_AT',
          type: 'date',
          required: true,
        },
        {
          code: 'endAt',
          label: 'jj._END_AT',
          type: 'date',
          required: false,
        },
        {
          code: 'drawAt',
          label: 'jj._DRAW_AT',
          type: 'date',
          required: false,
        },
        {
          code: 'minSpend',
          label: 'jj._MIN_SPEND',
          type: 'number',
          required: true,
        },
        {
          code: 'serialNoPrefix',
          label: 'jj._PREFIX',
          type: 'text',
          required: false,
        },
        {
          code: 'serialNoPostfix',
          label: 'jj._POSTFIX',
          type: 'text',
          required: false,
        },
        {
          code: 'serialNoSeqLength',
          label: 'jj._LENGTH',
          type: 'text',
          required: false,
        },
        {
          code: 'serialNoSeqPadStr',
          label: 'jj._PADSTR',
          type: 'text',
          required: false,
        },
        {
          code: 'ticketMethod',
          label: 'jj._TICKET_METHOD',
          options: [
            {
              code: '_RANDOM_CHAR',
              label: 'jj._RANDOM_CHAR',
            },
            {
              code: '_SEQUENCE',
              label: 'jj._SEQUENCE',
            },
          ],
          type: 'select',
          required: true,
        },
        {
          code: 'prizes',
          label: 'jj._PRIZES',
          type: 'array',
          dataType: 'custom',
          childForm: this.eventPrizeForm,
          arrayConfig: {
            nameFields: ['name', 'worth', 'quantity'],
            nameSeparator: ' ',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
        {
          code: 'prizes',
          label: 'jj._POINT_RULES',
          type: 'array',
          dataType: 'custom',
          childForm: this.eventPointForm,
          arrayConfig: {
            nameFields: ['minimum_spend', 'free_points'],
            nameSeparator: ' ',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
        {
          code: 'prizes',
          label: 'jj._SNW_RULES',
          type: 'array',
          dataType: 'custom',
          childForm: this.eventSNWForm,
          arrayConfig: {
            nameFields: ['minimum_spend', 'free_tickets'],
            nameSeparator: ' ',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
        {
          code: 'backgroundImage',
          label: 'jj._BACKGROUND_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'thumbnailImage',
          label: 'jj._THUMBNAIL_IMAGE',
          type: 'files',
          required: false,
        },
      ],
    };
  }
}
