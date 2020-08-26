import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    LoginService
  ]
})
export class LoginComponent implements OnInit {

username: string;
password: string;
invalidLogin = false

  constructor(private router: Router, public _loginService: LoginService) { }

  ngOnInit() {

  }

  checkLogin(): void {
    this._loginService.checkLogin(this.username, this.password).subscribe((result) => {

      localStorage.setItem("ChatToken",result.token);

      this.router.navigate(['/chat/']);
    }, (err) => {
      console.log(err);
    });
    }
}
