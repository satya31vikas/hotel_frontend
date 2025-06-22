import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { PayBillComponent } from './components/pay-bill/pay-bill.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';

const routes: Routes = [

  { path: '', component: CustomerComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'bookings', component: ViewBookingsComponent },
  { path: 'pay-bill/:id', component: PayBillComponent },
  { path: 'card-details/:id', component: CardDetailsComponent },
  { path: 'support', component: CustomerSupportComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
