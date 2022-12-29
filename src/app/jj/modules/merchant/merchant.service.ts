import { Injectable } from '@angular/core';
import { CmsForm } from 'src/app/cms.type';
import { CoreService } from '../../services';

@Injectable()
export class MerchantService {

  constructor(private core: CoreService) { }

  get eventPrizeForm(): CmsForm {
    return {
      code: 'event-prize',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
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
    };
  }

  get eventGiftForm(): CmsForm {
    return {
      code: 'event-gift',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
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
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
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
          type: 'datetime',
          required: true,
        },
        {
          code: 'endAt',
          label: 'jj._END_AT',
          type: 'datetime',
          required: false,
        },
        {
          code: 'drawAt',
          label: 'jj._DRAW_AT',
          type: 'datetime',
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
          childForm: this.eventGiftForm,
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
          childForm: this.eventSnwForm,
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

  // Scratch and Win Part
  get snwPrizesForm(): CmsForm {
    return {
      code: 'snw-prizes',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
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
          code: 'thumbnailImage',
          label: 'jj._THUMBNAIL_IMAGE',
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
          code: 'chance',
          label: 'jj._CHANCE',
          type: 'text',
          required: true,
        },
        {
          code: 'isActive',
          label: 'jj._IS_ACTIVE',
          type: 'checkbox',
          required: true,
        },
        {
          code: 'isDefault',
          label: 'jj._IS_DEFAULT',
          type: 'checkbox',
          required: true,
        },
        {
          code: 'type',
          label: 'jj._TYPE',
          type: 'select',
          required: true,
        },
        {
          code: 'walletType',
          label: 'jj._WALLET_TYPE',
          type: 'select',
          required: false,
        },
        {
          code: 'worth',
          label: 'jj._WORTH',
          type: 'number',
          required: true,
        },
        {
          code: 'totalLimit',
          label: 'jj._TOTAL_LIMIT',
          type: 'number',
          required: false,
        },
        {
          code: 'dailyLimit',
          label: 'jj._DAILY_LIMIT',
          type: 'number',
          required: false,
        },
        {
          code: 'userLimit',
          label: 'jj._USER_LIMIT',
          type: 'number',
          required: false,
        },
        {
          code: 'sequence',
          label: 'jj._SEQUENCE',
          type: 'number',
          required: false,
        },
      ],
    };
  }

  get snwEventForm(): CmsForm {
    return {
      code: 'snw-event',
      labelPosition: 'stacked',
      submitButtonText: '_SUBMIT',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'name',
          label: 'jj._NAME',
          type: "cms-translate",
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
          type: 'cms-translate',
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
          type: 'cms-translate',
          required: false,
        },
        {
          code: 'merchant_id',
          label: 'jj._MERCHANT',
          type: 'select',
          required: false,
        },
        {
          code: 'prizes',
          label: 'jj._SNW_PRIZES',
          type: 'array',
          dataType: 'custom',
          childForm: this.snwPrizesForm,
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
    pointRulesField.childForm = await this.getGiftForm();

    let SNWRulesField = eventForm.items.find((item) => item.code == 'scratchAndWinRules');
    SNWRulesField.childForm = await this.getSnwForm();

    return eventForm;
  }

  async getGiftForm() {
    let giftForm = this.eventGiftForm;

    let modes = await this.core.getIssueModes();
    let modeField = giftForm.items.find((item) => item.code == 'issue_mode');
    modeField.options = modes.map((mode) => ({
      code: mode.code,
      label: mode.name,
    }));

    return giftForm;
  }

  async getSnwForm() {
    let SNWForm = this.eventSnwForm;

    let modes = await this.core.getIssueModes();
    let modeField = SNWForm.items.find((item) => item.code == 'issue_mode');
    modeField.options = modes.map((mode) => ({
      code: mode.code,
      label: mode.name,
    }));

    return SNWForm;
  }

  async getSnwEventForm() {
    let snwEventForm = this.snwEventForm;

    // let statuses = await this.core.getEventStatuses();
    // let statusField = eventForm.items.find((item) => item.code == 'status');
    // statusField.options = statuses.map((status) => ({
    //   code: status.code,
    //   label: status.name,
    // }));

    let snwPrizeType = await this.core.getSnwPrizeType();
    let snwPrizeTypeField = snwEventForm.items.find((item) => item.code == 'SNW Prize Type');
    snwPrizeTypeField.options = snwPrizeType.map((status) => ({
      code: status.code,
      label: status.name,
    }));

    let walletType = await this.core.getWalletType();
    let walletTypeField = snwEventForm.items.find((item) => item.code == 'walletType');
    walletTypeField.options = walletType.map((status) => ({
      code: status.code,
      label: status.name,
    }));

    return snwEventForm;
  }






}
