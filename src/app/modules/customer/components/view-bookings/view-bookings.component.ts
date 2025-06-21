import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-bookings',
  standalone: false,
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent {

  currentPage: number = 1;
  total: number = 0;
  bookings: any[] = [];

  constructor(private customerService: CustomerService) {
    this.getBookings();
  }

  getBookings() {
    this.customerService.getMyBookings(this.currentPage - 1).subscribe(
      (res) => {
        this.bookings = res.reservationDtoList;
        this.total = res.totalPages * 5;
      },
      (error) => {
        alert(`Error: ${error?.error || 'Failed to fetch bookings'}`);
      }
    );
  }

  pageIndexChange(value: number) {
    this.currentPage = value;
    this.getBookings();
  }
}
