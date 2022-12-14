import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.page.html',
  styleUrls: ['./verify-pin.page.scss'],
})
export class VerifyPinPage implements OnInit {

  PIN: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: ''
  };

  values: any[];

  constructor() { }

  ngOnInit() {
  }

  // change(value) {
  //   this.cdRef.detectChanges();
  //   this.showValue = value.length > 0 ? value.substring(0, 1) : value;
  // }

  // gotoNextField(nextElement)
  // nextElement.focus();

  pinController(event,next,prev,index?){

    if(index == 6 && event.target.value.length == 1) {
      console.log("submit")
    }
    else if(event.target.value.length == 0 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length == 1){
      next.setFocus()
    }
    else {
      return 0;
    } 
 }

 numberOnlyValidation(event: any) {
  const pattern = /[0-9.,]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    event.preventDefault();
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
