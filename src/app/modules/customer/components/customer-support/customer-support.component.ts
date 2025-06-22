import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-support',
  standalone: false,
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})
export class CustomerSupportComponent {
  customerName: string = '';
  email: string = '';
  rating: number = 5;
  feedbackText: string = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  submitFeedback() {
    const feedbackDto = {
      customerName: this.customerName,
      email: this.email,
      rating: this.rating,
      message: this.feedbackText // make sure your DTO expects "message"
    };

    this.customerService.submitFeedback(feedbackDto).subscribe({
      next: () => {
        alert('Feedback submitted successfully!');
        this.router.navigate(['/customer']);
      },
      error: () => alert('Error submitting feedback.')
    });
  }

}
