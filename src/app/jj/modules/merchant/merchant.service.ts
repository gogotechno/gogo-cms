import { Injectable } from '@angular/core';
import { CmsForm, CmsFormItem } from 'src/app/cms.type';
import { SwsFileHandler } from 'src/app/sws-erp.service';
import { CoreService } from '../../services';

@Injectable()
export class MerchantService {
  constructor(private core: CoreService, private swsFileHandler: SwsFileHandler) {}

  fileSettings(documentType: string): Partial<CmsFormItem> {
    return {
      fileConfig: {
        multiple: false,
        outputType: 'uploadUrl',
        realtimeUpload: true,
      },
      fileHandler: {
        onUpload: this.swsFileHandler.onUpload(documentType),
        onPreview: this.swsFileHandler.onPreview(),
      },
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lucky Draw Event
  // -----------------------------------------------------------------------------------------------------

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
          type: 'cms-translate',
          required: true,
          stringify: true,
          referTo: 'nameTranslation',
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
          code: 'thumbnailImage',
          label: 'jj._THUMBNAIL_IMAGE',
          type: 'files',
          ...this.fileSettings('Event Prize'),
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
          code: 'minimumSpend',
          label: 'jj._MIN_SPEND',
          type: 'number',
          required: true,
        },
        {
          code: 'freePoint',
          label: 'jj._FREE_POINTS',
          type: 'number',
          required: true,
        },
        {
          code: 'validFrom',
          label: 'jj._VALID_FROM',
          type: 'datetime',
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
          code: 'validTo',
          label: 'jj._VALID_TO',
          type: 'datetime',
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
          code: 'priority',
          label: 'jj._PRIORITY',
          type: 'number',
          required: true,
        },
        {
          code: 'issueMode',
          label: 'jj._ISSUE_MODE',
          type: 'select',
          required: true,
        },
        {
          code: 'isActive',
          label: 'jj._IS_ACTIVE',
          type: 'checkbox',
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
          code: 'minimumSpend',
          label: 'jj._MIN_SPEND',
          type: 'number',
          required: true,
        },
        {
          code: 'freeTickets',
          label: 'jj._FREE_TICKETS',
          type: 'number',
          required: true,
        },
        {
          code: 'validFrom',
          label: 'jj._VALID_FROM',
          type: 'datetime',
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
          code: 'validTo',
          label: 'jj._VALID_TO',
          type: 'datetime',
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
        },
        {
          code: 'priority',
          label: 'jj._PRIORITY',
          type: 'number',
          required: true,
        },
        {
          code: 'issueMode',
          label: 'jj._ISSUE_MODE',
          type: 'select',
          required: true,
        },
        {
          code: 'isActive',
          label: 'jj._IS_ACTIVE',
          type: 'checkbox',
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
          referTo: 'nameTranslation',
        },
        {
          code: 'backgroundImage',
          label: 'jj._BACKGROUND_IMAGE',
          type: 'files',
          ...this.fileSettings('Event'),
        },
        {
          code: 'thumbnailImage',
          label: 'jj._THUMBNAIL_IMAGE',
          type: 'files',
          ...this.fileSettings('Event'),
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
          stringify: true,
          referTo: 'highlightTranslation',
        },
        {
          code: 'description',
          label: 'jj._DESCRIPTION',
          type: 'cms-translate-editor',
          hideHtml: true,
          stringify: true,
          referTo: 'descriptionTranslation',
        },
        {
          code: 'tnc',
          label: 'jj._TNC',
          type: 'cms-translate-editor',
          hideHtml: true,
          stringify: true,
          referTo: 'tncTranslation',
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
            nameFields: ['minimumSpend', 'freePoint'],
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
            nameFields: ['minimumSpend', 'freeTickets'],
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
    let modeField = giftForm.items.find((item) => item.code == 'issueMode');
    modeField.options = modes.map((mode) => ({
      code: mode.code,
      label: mode.name,
    }));

    return giftForm;
  }

  async getEventSnwForm() {
    let snwForm = this.eventSnwForm;

    let modes = await this.core.getIssueModes();
    let modeField = snwForm.items.find((item) => item.code == 'issueMode');
    modeField.options = modes.map((mode) => ({
      code: mode.code,
      label: mode.name,
    }));

    return snwForm;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Scratch and Win Event
  // -----------------------------------------------------------------------------------------------------

  get snwPrizeForm(): CmsForm {
    return {
      code: 'snw-prizes',
      labelPosition: 'stacked',
      autoValidate: true,
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'name',
          label: 'jj._NAME',
          type: 'cms-translate',
          required: true,
          stringify: true,
          referTo: 'nameTranslation',
        },
        {
          code: 'thumbnailImage',
          label: 'jj._THUMBNAIL_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Prize'),
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
          code: 'chance',
          label: 'jj._CHANCE',
          type: 'number',
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
          required: true,
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
        },
        {
          code: 'dailyLimit',
          label: 'jj._DAILY_LIMIT',
          type: 'number',
        },
        {
          code: 'userLimit',
          label: 'jj._USER_LIMIT',
          type: 'number',
        },
        {
          code: 'sequence',
          label: 'jj._SEQUENCE',
          type: 'number',
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
          referTo: 'nameTranslation',
        },
        {
          code: 'startAt',
          label: 'jj._START_AT',
          type: 'date',
          required: true,
          dateFormat: 'YYYY-MM-DD',
        },
        {
          code: 'endAt',
          label: 'jj._END_AT',
          type: 'date',
          required: true,
          dateFormat: 'YYYY-MM-DD',
        },
        {
          code: 'isActive',
          label: 'jj._IS_ACTIVE',
          type: 'checkbox',
          required: true,
        },
        {
          code: 'tnc',
          label: 'jj._TNC',
          type: 'cms-translate-editor',
          required: true,
          hideHtml: true,
          stringify: true,
          referTo: 'tncTranslation',
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
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'coverImage',
          label: 'jj._COVER_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'backgroundImage',
          label: 'jj._BACKGROUND_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'cardBackgroundImage',
          label: 'jj._CARD_BACKGROUND_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'scratchAreaPlaceholderImage',
          label: 'jj._SCRATCH_AREA_PLACEHOLDER_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'congratulationImage',
          label: 'jj._CONGRATULATION_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'congratulationBackgroundImage',
          label: 'jj._CONGRATULATION_BACKGROUND_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'congratulationMessage',
          label: 'jj._CONGRATULATION_MESSAGE',
          type: 'cms-translate',
          stringify: true,
          referTo: 'congratTranslation',
        },
        {
          code: 'thankYouImage',
          label: 'jj._THANKYOU_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'thankYouBackgroundImage',
          label: 'jj._THANKYOU_BACKGROUND_IMAGE',
          type: 'files',
          ...this.fileSettings('Scratch And Win Event'),
        },
        {
          code: 'thankYouMessage',
          label: 'jj._THANKYOU_MESSAGE',
          type: 'cms-translate',
          stringify: true,
          referTo: 'thankTranslation',
        },
        {
          code: 'prizes',
          label: 'jj._PRIZES',
          type: 'array',
          dataType: 'custom',
          arrayConfig: {
            nameFields: ['name', 'chance', 'isActive', 'isDefault'],
            nameSeparator: ' ',
            closeButtonPosition: 'end',
            submitButtonPosition: 'footer',
          },
        },
      ],
    };
  }

  async getSnwEventForm() {
    let snwEventForm = this.snwEventForm;

    let prizesField = snwEventForm.items.find((item) => item.code == 'prizes');
    prizesField.childForm = await this.getSnwPrizeForm();

    return snwEventForm;
  }

  async getSnwPrizeForm() {
    let prizeForm = this.snwPrizeForm;

    let types = await this.core.getScratchAndWinPrizeTypes();
    let typeField = prizeForm.items.find((item) => item.code == 'type');
    typeField.options = types.map((type) => ({
      code: type.code,
      label: type.name,
    }));

    let walletTypes = await this.core.getWalletTypes();
    let walletTypeField = prizeForm.items.find((item) => item.code == 'walletType');
    walletTypeField.options = walletTypes.map((type) => ({
      code: type.code,
      label: type.name,
    }));

    return prizeForm;
  }
}
