import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isAdminLoggedIn = false;
  isCustomerLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStorage: UserStorageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.userStorage.user$.subscribe(user => {
      this.isAdminLoggedIn = user?.role === 'ADMIN';
      this.isCustomerLoggedIn = user?.role === 'CUSTOMER';
      this.cdr.detectChanges();
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.userId && res.jwt) {
          const user = { id: res.userId, role: res.userRole };
          this.userStorage.saveUser(user);
          this.userStorage.saveToken(res.jwt);
          this.cdr.detectChanges();

          if (user.role === 'ADMIN') {
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.router.navigateByUrl('/customer/rooms');
          }
        } else {
          alert('Login failed. Invalid response from server.');
        }
      },
      error: () => {
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}
