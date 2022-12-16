import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss'],
})
export class VerifyPinComponent implements OnInit {
  walletNo: string;
  form = form;

  constructor(private modalCtrl: ModalController, private core: CoreService) {}

  values: any[];

  constructor() { }

  ngOnInit() {
  }

  async onVerify(data: VerifyPinDto) {
    await this.core.createPinVerification({
      walletNo: this.walletNo,
      walletPin: data.pin,
    });
    await this.modalCtrl.dismiss({ success: true });
  }
}

// submit(e:Event){
        
//   this.values=[];
//   this.PIN.first.value="";
//   this.PIN.second.value="";
//   this.PIN.third.value="";
//   this.PIN.fourth.value="";
//   this.PIN.fifth.value="";
//   this.PIN.sixth.value="";
//   e.stopPropagation();
  
// }

// onKeyUp(event,index){  
//   console.log(event);
//   if(event.target.value.length !=1){
//     this.setFocus(index-2);  
//   }else{
//     this.values.push(event.target.value);  
//     this.setFocus(index);   
//   }
//   event.stopPropagation();
// }

// setFocus(index){
       
//   switch(index){
//     case 0:
//     this.PIN.first.setFocus();
//     break;
//     case 1:
//     this.PIN.second.setFocus();
//     break;
//     case 2:
//     this.PIN.third.setFocus();
//     break;
//     case 3:
//     this.PIN.fourth.setFocus();
//     break;
//     case 4:
//     this.PIN.fifth.setFocus();
//     break;
//     case 5:
//     this.PIN.sixth.setFocus();
//     break;
//     }

// }

// contactForm = new FormGroup({
//   pin1: new FormControl('', Validators.required),
//   pin2: new FormControl('', Validators.required),
//   pin3: new FormControl('', Validators.required),
//   pin4: new FormControl('', Validators.required),
//   pin5: new FormControl('', Validators.required),
//   pin6: new FormControl('', Validators.required),
// });

// submitForm() {
// 	console.log(this.contactForm.value);
// }

}
