import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      countryCode: ['+91', Validators.required],
      mobile: [
        null,
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$') // 10 digits starting with 6-9
        ]
      ],
      address: [null],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])[A-Za-z\\d\\W]{8,}$'
          )
        ]
      ],
      confirmPassword: [null, Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  submitForm() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        if (res.id) {
          alert('SignUp Successful');
          this.router.navigateByUrl('/');
        } else {
          alert(res.message || 'Registration failed.');
        }
      },
      error: (error) => {
        alert(error.error?.message || 'Registration failed.');
      }
    });
  }
}
