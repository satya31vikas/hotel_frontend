import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pay-bill',
  standalone: false,
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.scss']
})
export class PayBillComponent {
  amount: number = 0;
  reservationId: number = 0;
  selectedCard: 'debit' | 'credit' | '' = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reservationId = +params['id'];
    });

    this.route.queryParams.subscribe(qp => {
      this.amount = +qp['amount'];
    });
  }

  selectCard(type: 'debit' | 'credit') {
    this.selectedCard = type;
  }

  proceedToCardDetails() {
    this.router.navigate(['/customer/card-details', this.reservationId], {
      queryParams: {
        amount: this.amount,
        cardType: this.selectedCard
      }
    });
  }
}
