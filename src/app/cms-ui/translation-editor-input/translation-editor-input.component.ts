import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { languages } from 'src/app/cms.constant';
import { CmsService } from 'src/app/cms.service';
import { CmsTranslation } from 'src/app/cms.type';

import Quill from 'quill'
const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
Quill.register(block, true);

@Component({
  selector: 'cms-translation-editor-input',
  templateUrl: './translation-editor-input.component.html',
  styleUrls: ['./translation-editor-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TranslationEditorInputComponent),
      multi: true
    }
  ]
})
export class TranslationEditorInputComponent implements OnInit, ControlValueAccessor {

  languages = languages;
  value: CmsTranslation = {};
  language: string;
  text: string;
  disabled = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.language = this.cms.SITE.defaultLanguage;
    this.onChange(this.value);
  }

  writeValue(value: CmsTranslation): void {
    if (value) {
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
    console.log('Language changed', this.value)
  }

  textChanged(event?: Event) {
    if (this.value != null) {
      this.value[this.language] = this.text;
      this.onChange(this.value);
    }
    console.log('Text changed', this.value)
  }
}


