import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { languages } from 'src/app/cms.constant';
import { CmsService } from 'src/app/cms.service';
import { CmsSite, CmsTranslation } from 'src/app/cms.type';
import { QuillModules } from 'ngx-quill';
import { AppUtils, CmsUtils } from 'src/app/cms.util';

@Component({
  selector: 'cms-translation-editor-input',
  templateUrl: './translation-editor-input.component.html',
  styleUrls: ['./translation-editor-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TranslationEditorInputComponent),
      multi: true,
    },
  ],
})
export class TranslationEditorInputComponent implements OnInit, ControlValueAccessor {
  @Input('collection-path') collectionPath: string;
  @Input('hide-html') hideHtml: boolean = true;

  site: CmsSite;
  language: string;
  languages = languages;
  text: string;
  value: CmsTranslation = {};
  modules: QuillModules;

  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
    private app: AppUtils,
    private cmsUtils: CmsUtils,
    private cms: CmsService,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit() {
    this.site = this.cms.SITE;
    this.language = this.site.defaultLanguage;
    this.modules = this.getModules();
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

  getModules() {
    const uploadFile = (file: File) =>
      new Promise(async (resolve, reject) => {
        try {
          if (this.collectionPath.split('/').length < 2) {
            await this.app.presentAlert('_PLEASE_SAVE_OR_SUBMIT_TO_UPLOAD_FILE', '_ERROR');
            reject('Please save document to get valid collection path');
            return;
          }
          const pathName = `${this.site.code}/upload/${this.collectionPath}/${file.name}`;
          const ref = this.storage.ref(pathName);
          const task = this.storage.upload(pathName, file);
          const res = await task.snapshotChanges().toPromise();
          const url = await ref.getDownloadURL().toPromise();
          resolve(url);
        } catch (err) {
          console.error(err);
          await this.app.presentAlert('_ERROR_WHILE_UPLOADING_FILE', '_ERROR');
          reject('Error while uploading file');
        }
      });

    const modules: QuillModules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: [] }],
        [{ header: [] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video', 'formula'],
      ],
      imageResize: {},
      imageHandler: {
        upload: uploadFile,
      },
      videoHandler: {
        upload: uploadFile,
      },
    };

    return modules;
  }
}
