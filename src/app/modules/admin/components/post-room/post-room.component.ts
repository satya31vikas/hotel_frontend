import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-post-room',
  standalone: false,
  templateUrl: './post-room.component.html',
  styleUrls: ['./post-room.component.scss']
})
export class PostRoomComponent {

  roomDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.roomDetailsForm.invalid) return;

    this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe({
      next: () => {
        alert('Room posted successfully');
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        alert(`Error: ${err.error}`);
      }
    });
  }
}
