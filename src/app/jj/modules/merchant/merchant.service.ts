import { Injectable } from '@angular/core';
import { CmsForm } from 'src/app/cms.type';
import { SwsFileHandler } from 'src/app/sws-erp.service';
import { CoreService } from '../../services';

@Injectable()
export class MerchantService {
  constructor(private core: CoreService, private swsFileHandler: SwsFileHandler) {}

  get eventPrizeForm(): CmsForm {
    return {
      code: 'event-prize',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'event_id',
          label: 'jj._EVENT',
          type: 'number',
          hidden: true,
        },
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
          code: 'thumbnail_image',
          label: 'jj._THUMBNAIL_IMAGE',
          type: 'files',
        },
      ],
    };
  }

  get eventGiftForm(): CmsForm {
    return {
      code: 'event-gift',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'event_id',
          label: 'jj._EVENT',
          type: 'number',
          hidden: true,
        },
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
          type: 'datetime',
        },
        {
          code: 'vaild_to',
          label: 'jj._VAILD_TO',
          type: 'datetime',
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
          type: 'select',
          required: true,
        },
      ],
    };
  }

  get eventSnwForm(): CmsForm {
    return {
      code: 'event-snw',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'event_id',
          label: 'jj._EVENT',
          type: 'number',
          hidden: true,
        },
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
          type: 'datetime',
        },
        {
          code: 'vaild_to',
          label: 'jj._VAILD_TO',
          type: 'datetime',
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
          type: 'select',
          required: true,
        },
      ],
    };
  }

  get eventForm(): CmsForm {
    return {
      code: 'event',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'merchant_id',
          label: 'jj._MERCHANT',
          type: 'number',
          required: true,
          hidden: true,
        },
        {
          code: 'name',
          label: 'jj._NAME',
          type: 'cms-translate',
          required: true,
          stringify: true,
        },
        {
          code: 'backgroundImage',
          label: 'jj._BACKGROUND_IMAGE',
          type: 'files',
          maximum: 1,
          fileConfig: {
            outputType: 'urlOnly',
            realtimeUpload: true,
          },
          fileHandler: {
            onUpload: this.swsFileHandler.onUpload('Event'),
          },
        },
        {
          code: 'thumbnailImage',
          label: 'jj._THUMBNAIL_IMAGE',
          type: 'files',
          maximum: 1,
        },
        {
          code: 'status',
          label: 'jj._STATUS',
          type: 'select',
          required: true,
        },
        {
          code: 'startAt',
          label: 'jj._START_AT',
          type: 'datetime',
          required: true,
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
          code: 'endAt',
          label: 'jj._END_AT',
          type: 'datetime',
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
          code: 'drawAt',
          label: 'jj._DRAW_AT',
          type: 'datetime',
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
          code: 'minSpend',
          label: 'jj._MIN_SPEND',
          type: 'number',
          required: true,
        },
        {
          code: 'highlight',
          label: 'jj._HIGHLIGHT',
          type: 'cms-translate',
        },
        {
          code: 'description',
          label: 'jj._DESCRIPTION',
          type: 'cms-translate-editor',
          hideHtml: true,
        },
        {
          code: 'tnc',
          label: 'jj._TNC',
          type: 'cms-translate-editor',
          hideHtml: true,
        },
        {
          code: 'serialNoPrefix',
          label: 'jj._SERIAL_NO_PREFIX',
          type: 'text',
        },
        {
          code: 'serialNoPostfix',
          label: 'jj._SERIAL_NO_POSTFIX',
          type: 'text',
        },
        {
          code: 'serialNoSeqLength',
          label: 'jj._SERIAL_NO_SEQ_LENGTH',
          type: 'text',
        },
        {
          code: 'serialNoSeqPadStr',
          label: 'jj._SERIAL_NO_SEQ_PAD_STR',
          type: 'text',
        },
        {
          code: 'ticketMethod',
          label: 'jj._TICKET_METHOD',
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
          code: 'pointRules',
          label: 'jj._POINT_RULES',
          type: 'array',
          dataType: 'custom',
          arrayConfig: {
            nameFields: ['minimum_spend', 'free_points'],
            nameSeparator: ' ',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
        {
          code: 'scratchAndWinRules',
          label: 'jj._SNW_RULES',
          type: 'array',
          dataType: 'custom',
          arrayConfig: {
            nameFields: ['minimum_spend', 'free_tickets'],
            nameSeparator: ' ',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
        {
          code: 'showEndDateCountdown',
          label: 'jj._SHOW_END_DATE_COUNTDOWN',
          type: 'checkbox',
        },
        {
          code: 'showNearestStore',
          label: 'jj._SHOW_NEAREST_STORE',
          type: 'checkbox',
        },
        {
          code: 'showCustomerTickets',
          label: 'jj._SHOW_CUSTOMER_TICKETS',
          type: 'checkbox',
        },
      ],
    };
  }

  get snwPrizesForm(): CmsForm {
    return {
      code: 'snw-prizes',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'name',
          label: 'jj._NAME',
          type: 'cms-translate-editor',
          required: true,
        },
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
          type: 'select',
          required: true,
        },
      ],
    };
  }

  get snwEventForm(): CmsForm {
    return {
      code: 'snw-event',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'name',
          label: 'jj._NAME',
          type: 'cms-translate',
          required: true,
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
          required: true,
        },
        {
          code: 'tnc',
          label: 'jj._TNC',
          type: 'cms-translate-editor',
          required: true,
        },
        {
          code: 'isActive',
          label: 'jj._IS_ACTIVE',
          type: 'checkbox',
          required: true,
        },
        {
          code: 'pricePerScratch',
          label: 'jj._PRICE_PER_SCRATCH',
          type: 'number',
          required: true,
        },
        {
          code: 'logo',
          label: 'jj._LOGO',
          type: 'files',
          required: false,
        },
        {
          code: 'coverImage',
          label: 'jj._COVER_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'backgroundImage',
          label: 'jj._BACKGROUND_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'cardBackgroundImage',
          label: 'jj._CARD_BACKGROUND_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'scratchAreaPlaceholderImage',
          label: 'jj._SCRATCH_AREA_PLACEHOLDER_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'congratulationImage',
          label: 'jj._CONGRATULATION_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'congratulationBackgroundImage',
          label: 'jj._CONGRATULATION_BACKGROUND_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'congratulationMessage',
          label: 'jj._CONGRATULATION_MESSAGE',
          type: 'cms-translate-editor',
          required: false,
        },
        {
          code: 'thankYouImage',
          label: 'jj._THANKYOU_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'thankYouBackgroundImage',
          label: 'jj._THANKYOU_BACKGROUND_IMAGE',
          type: 'files',
          required: false,
        },
        {
          code: 'thankYouMessage',
          label: 'jj._THANKYOU_MESSAGE',
          type: 'cms-translate-editor',
          required: false,
        },
        {
          code: 'merchant_id',
          label: 'jj._MERCHANT',
          type: 'text',
          required: false,
        },
        {
          code: 'prizes',
          label: 'jj._SNW_PRIZES',
          type: 'array',
          dataType: 'custom',
          required: false,
          arrayConfig: {
            nameFields: ['minimum_spend', 'free_tickets'],
            nameSeparator: ' ',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
      ],
    };
  }

  async getEventForm(): Promise<CmsForm> {
    let eventForm = this.eventForm;

    let statuses = await this.core.getEventStatuses();
    let statusField = eventForm.items.find((item) => item.code == 'status');
    statusField.options = statuses.map((status) => ({
      code: status.code,
      label: status.name,
    }));

    let methods = await this.core.getTicketGenerationMethods();
    let methodsField = eventForm.items.find((item) => item.code == 'ticketMethod');
    methodsField.options = methods.map((methods) => ({
      code: methods.code,
      label: methods.name,
    }));

    let pointRulesField = eventForm.items.find((item) => item.code == 'pointRules');
    pointRulesField.childForm = await this.getEventGiftForm();

    let snwRulesField = eventForm.items.find((item) => item.code == 'scratchAndWinRules');
    snwRulesField.childForm = await this.getEventSnwForm();

    return eventForm;
  }

  async getEventGiftForm() {
    let giftForm = this.eventGiftForm;

    let modes = await this.core.getIssueModes();
    let modeField = giftForm.items.find((item) => item.code == 'issue_mode');
    modeField.options = modes.map((mode) => ({
      code: mode.code,
      label: mode.name,
    }));

    return giftForm;
  }

  async getEventSnwForm() {
    let snwForm = this.eventSnwForm;

    let modes = await this.core.getIssueModes();
    let modeField = snwForm.items.find((item) => item.code == 'issue_mode');
    modeField.options = modes.map((mode) => ({
      code: mode.code,
      label: mode.name,
    }));

    return snwForm;
  }

  async getSnwEventForm() {
    let snwEventForm = this.snwEventForm;
    return snwEventForm;
  }
}
