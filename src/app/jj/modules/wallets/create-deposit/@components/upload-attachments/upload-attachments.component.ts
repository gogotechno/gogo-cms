import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { JJBankAccount } from 'src/app/jj/typings';

@Component({
  selector: 'app-upload-attachments',
  templateUrl: './upload-attachments.component.html',
  styleUrls: ['./upload-attachments.component.scss'],
})
export class UploadAttachmentsComponent implements OnInit {
  bankAccount: JJBankAccount;
  attachments: {
    file: File;
    name: string;
    type: 'image' | 'file';
    previewUrl: string;
  }[];

  constructor(private modalCtrl: ModalController, private core: CoreService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.attachments = [];
    this.bankAccount = await this.core.getDefaultBankAccount();
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }

  async onFileChange(event: Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    if (!file) {
      return;
    }

    let previewUrl: string;
    let type: 'image' | 'file';
    if (file.type.startsWith('image')) {
      type = 'image';
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          previewUrl = String(reader.result);
          resolve(true);
        };
      });
    } else {
      type = 'file';
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

    this.attachments.push({
      file,
      name: file.name,
      type,
      previewUrl,
    });
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
  }
}
