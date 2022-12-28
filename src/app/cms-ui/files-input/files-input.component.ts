import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CmsFile, CmsFileConfig, CmsFileHandler, CmsTranslable, OnFileUpload } from 'src/app/cms.type';

@Component({
  selector: 'cms-files-input',
  templateUrl: './files-input.component.html',
  styleUrls: ['./files-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilesInputComponent),
      multi: true,
    },
  ],
})
export class FilesInputComponent implements OnInit, ControlValueAccessor {
  @Input('code') code: string;
  @Input('label') label: CmsTranslable;
  @Input('required') required: boolean;
  @Input('maximum') maximum: number;
  @Input('readonly') readonly: boolean;
  @Input('showEmptyMessage') showEmptyMessage: boolean;
  @Input('files') files: CmsFile[];
  @Input('config') config: CmsFileConfig;
  @Input('handler') handler: CmsFileHandler;

  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  realtimeUpload: boolean;
  onUpload: OnFileUpload;

  get currentLength() {
    return this.files?.length || 0;
  }

  get canUpload() {
    if (this.readonly) {
      return false;
    }
    if (this.maximum) {
      return this.currentLength < this.maximum;
    }
    return true;
  }

  get canRemove() {
    return !this.readonly;
  }

  constructor() {}

  ngOnInit() {
    this.realtimeUpload = this.config?.realtimeUpload;
    this.onUpload = this.handler?.onUpload;
  }

  writeValue(files: CmsFile[]) {
    this.files = files;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    if (this.files.length == 0) {
      this.files = null;
    }
    this.writeValue(this.files);
    this.onChange(this.files);
  }

  async onFileChange(event: Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    if (!file) {
      return;
    }
    let fileType: 'image' | 'file' = file.type.startsWith('image') ? 'image' : 'file';
    let previewUrl: string;
    let base64String: string;
    if (this.realtimeUpload) {
      if (!this.onUpload) {
        throw new Error('ER_ONUPLOAD_FN_NOT_CONFIGURED');
      }
      previewUrl = await this.onUpload(file);
    } else {
      let dataUrl = await this.getDataUrl(file);
      let dataUrlArr = dataUrl.split(',');
      base64String = dataUrlArr[dataUrlArr.length - 1];
      previewUrl = this.getPreviewUrl(fileType, file.type, dataUrl);
    }
    if (!this.files) {
      this.files = [];
    }
    this.files.push({
      file: file,
      name: file.name,
      fileType: fileType,
      mimeType: file.type,
      previewUrl: previewUrl,
      base64String: base64String,
    });
    this.writeValue(this.files);
    this.onChange(this.files);
  }

  async getDataUrl(file: File) {
    let dataUrl: string;
    await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        dataUrl = String(reader.result);
        resolve(true);
      };
    });
    return dataUrl;
  }

  getPreviewUrl(fileType: 'image' | 'file', mimeType: string, dataUrl: string) {
    let previewUrl: string;
    if (fileType == 'image') {
      previewUrl = dataUrl;
    } else {
      switch (mimeType) {
        case 'application/pdf':
          previewUrl = 'assets/jj/file-types/pdf.png';
          break;
        case 'text/plain':
          previewUrl = 'assets/jj/file-types/txt.png';
          break;
        default:
          previewUrl = 'assets/jj/file-types/file.png';
          break;
      }
    }
    return previewUrl;
  }

  onItemClick(file: CmsFile) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', file.previewUrl);
    anchor.setAttribute('download', file.name);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
