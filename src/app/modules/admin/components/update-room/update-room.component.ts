import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-update-room',
  standalone: false,
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent {

  updateRoomForm: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.getRoomById();
  }

  getRoomById() {
    this.adminService.getRoomsById(this.id).subscribe({
      next: (res) => {
        this.updateRoomForm.patchValue(res);
      },
      error: (err) => {
        alert(`Error: ${err.error}`);
      }
    });
  }

  submitForm() {
    if (this.updateRoomForm.valid) {
      this.adminService.updateRoomDetails(this.id, this.updateRoomForm.value).subscribe({
        next: () => {
          alert('Room Updated Successfully');
          this.router.navigateByUrl('/admin/dashboard');
        },
        error: (err) => {
          alert(`Error: ${err.error}`);
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
