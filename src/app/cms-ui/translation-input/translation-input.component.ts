import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { languages } from 'src/app/cms.constant';
import { CmsService } from 'src/app/cms.service';
import { CmsTranslation } from 'src/app/cms.type';
import { CmsUtils } from 'src/app/cms.util';

@Component({
  selector: 'cms-translation-input',
  templateUrl: './translation-input.component.html',
  styleUrls: ['./translation-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TranslationInputComponent),
      multi: true,
    },
  ],
})
export class TranslationInputComponent implements OnInit, ControlValueAccessor {
  languages = languages;
  language: string;
  text: string;
  value: CmsTranslation = {};

  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private cmsUtils: CmsUtils, private cms: CmsService) {}

  ngOnInit() {
    this.language = this.cms.SITE.defaultLanguage;
  }

  writeValue(value: CmsTranslation): void {
    if (value) {
      if (typeof value == 'string') {
        value = this.cmsUtils.parseCmsTranslation(value);
      }
      this.value = value;
      this.onChange(this.value);
    }
    this.languageChanged();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  languageChanged(event?: Event) {
    if (this.value != null) {
      this.text = this.value[this.language];
    }
  }

  textChanged(event?: Event) {
    if (this.value != null) {
      this.value[this.language] = this.text;
      this.onChange(this.value);
    }
  }
}
