import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-card-details',
  standalone: false,
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent {
  reservationId!: number;
  amount!: number;
  cardType: 'debit' | 'credit' = 'debit';

  cardNumber = '';
  cardHolder = '';
  expiry = '';
  cvv = '';

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reservationId = +params['id'];
    });

    this.route.queryParams.subscribe(q => {
      this.amount = +q['amount'];
      this.cardType = q['cardType'] || 'debit';
    });
  }

  formatCardNumber() {
    this.cardNumber = this.cardNumber
      .replace(/\D/g, '')
      .substring(0, 16)
      .replace(/(.{4})/g, '$1-')
      .replace(/-$/, '');
  }

  isCardValid(): boolean {
    return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(this.cardNumber);
  }

  isFormValid(): boolean {
    return (
      this.isCardValid() &&
      this.cardHolder.trim().length > 0 &&
      !!this.expiry &&
      /^\d{3}$/.test(this.cvv)
    );
  }

  submitPayment() {
    if (!confirm('Are you sure you want to proceed with the payment?')) return;

    this.customerService.payForReservation(this.reservationId).subscribe({
      next: (res) => {
        console.log('✅ Payment API success response:', res);
        alert('Payment successful!');
        this.router.navigate(['/customer/bookings']);
      },
      error: (err) => {
        console.error('❌ Payment API error:', err);
        alert(`Payment failed: ${err.error?.message || 'Server error'}`);
      }
    });
  }
}
