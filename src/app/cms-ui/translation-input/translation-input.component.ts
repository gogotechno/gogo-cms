import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { languages } from 'src/app/cms.constant';
import { CmsService } from 'src/app/cms.service';
import { CmsTranslation } from 'src/app/cms.type';

@Component({
  selector: 'cms-translation-input',
  templateUrl: './translation-input.component.html',
  styleUrls: ['./translation-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TranslationInputComponent),
      multi: true
    }
  ]
})
export class TranslationInputComponent implements OnInit, ControlValueAccessor {

  languages = languages;
  value: CmsTranslation = {en: '', zh: '', ms: ''};
  // @Input('y') y: CmsTranslation;
  language: string;
  text: string;
  disabled = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.language = this.cms.SITE.defaultLanguage;
  }

  writeValue(value: CmsTranslation): void {
    if (value) {
      this.value = value;
    }
    this.languageChanged();
    console.log(this.value)
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
    console.log('Language changed', this.value)
  }

  textChanged(event?: Event) {
    if (this.value != null) {
      this.value[this.language] = this.text;
    }
    console.log('Text changed', this.value)
  }
}
