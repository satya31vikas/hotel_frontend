import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';

@Component({
  selector: 'app-rooms',
  standalone: false,
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  Math=Math;
  currentpage = 1;
  rooms: any[] = [];
  total = 0;
  loading = false;
  isVisible = false;

  todayString: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  checkInDateString: string = '';

  id!: number;

  constructor(
    private customerService: CustomerService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.todayString = this.formatDate(today);
    this.getRooms();
  }

  getRooms() {
    this.loading = true;
    this.customerService.getRooms(this.currentpage - 1).subscribe({
      next: res => {
        this.rooms = res?.roomDtoList || [];
        this.total = (res?.totalPages || 0) * 10;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  pageIndexChange(page: number) {
    if (page < 1 || page > Math.ceil(this.total / 10)) return;
    this.currentpage = page;
    this.getRooms();
  }

  onCheckInChange(value: string): void {
    this.checkInDate = value;
    this.checkInDateString = value;

    // Reset checkout if it's before or equal to check-in
    if (this.checkOutDate && this.checkOutDate <= value) {
      this.checkOutDate = '';
    }
  }

  onCheckOutChange(value: string): void {
  this.checkOutDate = value;
}

  showModal(id: number): void {
    this.id = id;
    this.checkInDate = '';
    this.checkOutDate = '';
    this.checkInDateString = this.todayString;
    this.isVisible = true;
  }

  handleOk(): void {
    const userId = this.userStorageService.getUserId();
    if (!this.checkInDate || !this.checkOutDate || !userId) return;

    const payload = {
      userId,
      roomId: this.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate
    };

    this.customerService.bookRoom(payload).subscribe(() => {
      this.isVisible = false;
      alert('Room booked successfully!');
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  getNextDate(dateStr: string): string {
  if (!dateStr) return this.todayString;
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return this.formatDate(date);
}


  formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
}
