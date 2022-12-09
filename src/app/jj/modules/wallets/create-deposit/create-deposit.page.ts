import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { AppUtils } from 'src/app/cms.util';


@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.page.html',
  styleUrls: ['./create-deposit.page.scss'],
})
export class CreateDepositPage implements OnInit {
  isModalOpen = false;
  text: string = "123456654321";

  constructor(private appUtils: AppUtils) { }

  ngOnInit() {

  }

  async writeToClipboard() {
    await Clipboard.write({
      string: this.text
    });

    await this.appUtils.presentAlert("Copied");
  };

  async checkClipboard() {
    const { type, value } = await Clipboard.read();
    console.log(`Got ${type} from clipboard: ${value}`);
  };

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  testingUrl: string;
  fileName: string;
  fileSize: number;

  onFileChange(event: any) {
    let file = (<HTMLInputElement>event.target).files[0];

    console.log(file);

    if (file.type.startsWith("image")) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let value = String(reader.result);
        this.testingUrl = value;
      }
    } else {
      switch (file.type) {
        case "application/pdf":
          this.testingUrl = "assets/jj/lucky-draw/file-types/icons8-pdf-48.png";
          break;
        case "text/plain":
          this.testingUrl = "assets/jj/lucky-draw/file-types/icons8-txt-48.png";
          break;
        default:
          this.testingUrl = "assets/jj/lucky-draw/file-types/icons8-new-document-48.png";
          break;
      }
    }

    switch (file.name) {
      default:
        this.fileName = file.name;
    }

    // switch (file.size) {
    //   default:
    //     this.fileSize = file.size;
    // }
  }

  onModalDismiss(event: any) {
    this.isModalOpen = false;
  }

}
