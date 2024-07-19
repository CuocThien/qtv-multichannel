import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username!: string;
  password!: string;
  loginError: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const isSuccess = this.authService.login(username, password);
      if (isSuccess) {
        this.router.navigate(['/home']);
        this.message.success('Login successfully');
      } else {
        this.message.error('Invalid username or password');
      }
    }
  }
}
