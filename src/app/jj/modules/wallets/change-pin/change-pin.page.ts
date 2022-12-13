import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.page.html',
  styleUrls: ['./change-pin.page.scss'],
})
export class ChangePinPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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

}
