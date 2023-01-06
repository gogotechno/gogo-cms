import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CmsFile, CmsFileConfig, CmsFileHandler, CmsTranslable, OnFilePreview, OnFileUpload } from 'src/app/cms.type';
import { CmsUtils } from 'src/app/cms.util';
import { GalleryComponent } from '../gallery/gallery.component';

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
  @Input('files') files: CmsFile[];
  @Input('config') config: CmsFileConfig;
  @Input('handler') handler: CmsFileHandler;

  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  @Input('multiple') multiple: boolean;
  @Input('outputType') outputType: 'default' | 'uploadUrl';
  @Input('acceptTypes') acceptTypes: string[];
  @Input('realtimeUpload') realtimeUpload: boolean;

  onUpload: OnFileUpload;
  onPreview: OnFilePreview;

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

  get acceptedTypes() {
    return this.acceptTypes.join(',');
  }

  constructor(private modalCtrl: ModalController, private cmsUtils: CmsUtils) {}

  ngOnInit() {
    this.multiple = this.config?.multiple;
    this.outputType = this.config?.outputType;
    if (!this.outputType) {
      this.outputType = 'default';
    }
    this.acceptTypes = this.config?.acceptTypes;
    if (!this.acceptTypes) {
      this.acceptTypes = ['image/*'];
    }
    this.realtimeUpload = this.config?.realtimeUpload;
    this.onUpload = this.handler?.onUpload;
    this.onPreview = this.handler?.onPreview;
  }

  convertStringToFile(value: string) {
    let response = this.cmsUtils.getFileType(value);
    let mimeType = this.cmsUtils.getMimeType(response.fileType, response.fileFormat);
    let file: CmsFile = {
      name: value,
      fileType: response.fileType,
      mimeType: mimeType,
      previewUrl: value,
    };
    return file;
  }

  async writeValue(value: string | CmsFile | (string | CmsFile)[]) {
    this.files = await this.convertToFiles(value);
  }

  async convertToFiles(value: string | CmsFile | (string | CmsFile)[]) {
    let files: CmsFile[] = [];
    if (!value) {
      return files;
    }
    if (value instanceof Array) {
      files = value.map((v) => this.convertToFile(v));
    } else {
      files.push(this.convertToFile(value));
    }
    files = await Promise.all(
      files.map(async (file) => {
        if (this.onPreview) {
          file.previewUrl = await this.onPreview(file.previewUrl);
        }
        file.previewUrl = this.cmsUtils.getPreviewUrl(file.fileType, file.mimeType, file.previewUrl);
        return file;
      }),
    );
    return files;
  }

  convertToFile(value: string | CmsFile) {
    if (typeof value == 'string') {
      return this.convertStringToFile(value);
    }
    return value;
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
    this.onChange(this.files);
  }

  async onFileChange(event: Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    if (!file) {
      return;
    }
    let fileType: 'image' | 'file' = file.type.startsWith('image') ? 'image' : 'file';
    let uploadUrl: string;
    let previewUrl: string;
    let base64String: string;
    if (this.realtimeUpload) {
      if (!this.onUpload) {
        throw new Error('ER_ONUPLOAD_FN_NOT_CONFIGURED');
      }
      let [_uploadUrl, _previewUrl] = await this.onUpload(file);
      uploadUrl = _uploadUrl;
      previewUrl = _previewUrl;
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
      uploadUrl: uploadUrl,
    });
    let result: string | CmsFile | (string | CmsFile)[];
    switch (this.outputType) {
      case 'uploadUrl':
        result = this.files.map((file) => file.uploadUrl);
        break;
      default:
        result = this.files;
        break;
    }
    if (!this.multiple) {
      result = result[0];
    }
    this.onChange(result);
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

  async onItemClick(file: CmsFile) {
    if (file.fileType == 'image') {
      const modal = await this.modalCtrl.create({
        component: GalleryComponent,
        componentProps: {
          images: [file.previewUrl],
        },
      });
      await modal.present();
    } else {
      const anchor = document.createElement('a');
      anchor.setAttribute('href', file.previewUrl);
      anchor.setAttribute('download', file.name);
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  }
}
