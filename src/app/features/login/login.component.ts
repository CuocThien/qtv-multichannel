import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;
  loginError: boolean = false;

  constructor(private authService: AuthService, private message: NzMessageService) {}

  login(): void {
    if (!this.authService.login(this.username, this.password)) {
      this.loginError = true;
      this.message.error('Invalid username or password');
    }
  }
}
