import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-admin-feedback',
  standalone: false,
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    (this.adminService.getAllFeedbacks() as any).subscribe({
      next: (res:any[]) => {
        this.feedbacks = res;
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error fetching feedbacks:', err);
        alert('Failed to load feedbacks');
        this.loading = false;
      }
    });
  }
}
