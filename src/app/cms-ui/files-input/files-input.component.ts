import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CmsFile, CmsTranslable } from 'src/app/cms.type';

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
export class FilesInputComponent implements ControlValueAccessor {
  @Input('code') code: string;
  @Input('label') label: CmsTranslable;
  @Input('required') required: boolean;
  @Input('maximum') maximum: number;
  @Input('readonly') readonly: boolean;
  @Input('showEmptyMessage') showEmptyMessage: boolean;
  @Input('files') files: CmsFile[];

  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

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

    let previewUrl: string;
    let fileType: 'image' | 'file';
    let dataUrl: string;
    await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        dataUrl = String(reader.result);
        resolve(true);
      };
    });
    if (file.type.startsWith('image')) {
      fileType = 'image';
      previewUrl = dataUrl;
    } else {
      fileType = 'file';
      switch (file.type) {
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
    let dataUrlArr = dataUrl.split(',');
    let base64String = dataUrlArr[dataUrlArr.length - 1];
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

  onItemClick(file: CmsFile) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', file.previewUrl);
    anchor.setAttribute('download', file.name);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
