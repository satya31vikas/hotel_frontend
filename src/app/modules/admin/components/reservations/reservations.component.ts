import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {

  currentPage: number = 1;
  total: number = 0;
  reservations: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.adminService.getReservations(this.currentPage - 1).subscribe(
      res => {
        this.reservations = res.reservationDtoList;
        this.total = res.totalPages * 4;
        if (this.reservations.length === 0 && this.currentPage > 1) {
          this.currentPage = 1;
        }
      },
      error => {
        console.error("Error fetching reservations:", error);
      }
    );
  }

  changeReservationStatus(reservationId: number, status: string) {
    this.adminService.changeReservationStatus(reservationId, status).subscribe(
      () => {
        alert(`Reservation status updated to ${status}`);
        this.getReservations();
      },
      error => {
        alert(`Failed to update reservation: ${error.error?.message || "Unknown error"}`);
      }
    );
  }

  pageIndexChange(value: number) {
    if (value < 1 || value > Math.ceil(this.total / 4)) return;
    this.currentPage = value;
    this.getReservations();
  }
}
