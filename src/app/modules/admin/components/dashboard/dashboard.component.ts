// dashboard.component.ts
import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentpage = 1;
  rooms: any[] = [];
  total = 0;
  loading = false;

  constructor(private adminService: AdminService, private router: Router) {
    this.getRooms();
  }

  getRooms() {
    this.loading = true;
    this.adminService.getRooms(this.currentpage - 1).subscribe({
      next: (res) => {
        this.rooms = res?.roomDtoList || [];
        this.total = (res?.totalPages || 1) * 10;
        this.loading = false;
      },
      error: () => {
        this.rooms = [];
        this.total = 0;
        this.loading = false;
        alert('Failed to load rooms.');
      }
    });
  }

  pageIndexChange(value: number) {
    this.currentpage = value;
    this.getRooms();
  }

  navigateToEdit(roomId: number) {
    this.router.navigateByUrl(`/admin/room/${roomId}/edit`);
  }

  deleteRoom(roomId: number) {
    if (confirm('Do you want to delete this room?')) {
      this.adminService.deleteRoom(roomId).subscribe({
        next: () => {
          alert('Room Deleted Successfully');
          this.getRooms();
        },
        error: () => {
          alert('Failed to delete room.');
        }
      });
    }
  }

  showConfirm(roomId: number) {
    this.deleteRoom(roomId);
  }
}
