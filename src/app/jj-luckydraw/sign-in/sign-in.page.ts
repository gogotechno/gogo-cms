import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  formGroup: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [true]
    });
  }

  async onSignIn(event?) {
    let formValue = this.formGroup.value;
    await this.auth.signInWithEmailAndPassword(formValue.email, formValue.password, formValue.rememberMe);
    console.log(location.pathname)
    this.router.navigateByUrl('/jj-luckydraw', { replaceUrl: true });
  }

}
