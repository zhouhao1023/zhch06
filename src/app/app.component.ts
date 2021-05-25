import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^zime/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //对应登录的表单
  myForm: FormGroup;

  //输入用户名的输入控件
  userName: AbstractControl;

  //输入密码的输入控件
  password: AbstractControl;

  name$: Observable<string>;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        'userName': ['111', Validators.compose([Validators.required, Validators.minLength(7), userNameValidator])],
        'password': ['1234', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      //可以再次实现自己的业务逻辑
      console.log(val);
    });
  }
  onSubmit(value: any) {
    console.log(value);
  }
}
