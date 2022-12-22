import { Injectable } from '@angular/core';
import { CmsForm } from 'src/app/cms.type';

@Injectable()
export class MerchantService {
  constructor() {}

  get eventForm(): CmsForm {
    return {
      code: 'update-event',
      labelPosition: 'stacked',
      submitButtonText: '_UPDATE',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'prizes',
          label: 'jj._PRIZES',
          type: 'array',
          dataType: 'custom',
          childForm: this.eventPrizeForm,
          arrayConfig: {
            nameFields: ['name', 'worth'],
            nameSeparator: '-',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
      ],
    };
  }

  get eventPrizeForm(): CmsForm {
    return {
      code: 'event-prize',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'name',
          label: 'jj._NAME',
          type: 'text',
        },
        {
          code: 'worth',
          label: 'jj._WORTH',
          type: 'number',
        },
      ],
    };
  }
}
