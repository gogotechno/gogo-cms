import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.page.html',
  styleUrls: ['./verify-pin.page.scss'],
})
export class VerifyPinPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // change(value) {
  //   this.cdRef.detectChanges();
  //   this.showValue = value.length > 0 ? value.substring(0, 1) : value;
  // }

  // gotoNextField(nextElement)
  // nextElement.focus();

  pinController(event,next,prev){

    if(event.target.value.length < 1 && prev){
      prev.setFocus();
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
    } 
 }

 numberOnlyValidation(event: any) {
  const pattern = /[0-9.,]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    event.preventDefault();
  }
}

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
