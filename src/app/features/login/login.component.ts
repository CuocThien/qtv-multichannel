import { Component } from '@angular/core';
import { AuthService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password);
      // this.msalService
      //   .loginPopup()
      //   .subscribe((response: AuthenticationResult) => {
      //     this.msalService.instance.setActiveAccount(response.account);
      //   });
    }
  }
}
