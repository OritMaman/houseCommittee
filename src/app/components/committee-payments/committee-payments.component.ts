import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Cities } from 'src/app/classes/cities';
import { DayarService } from 'src/app/services/dayar.service';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';
import { PaymentsComponent } from '../payments/payments.component';

@Component({
  selector: 'app-committee-payments',
  templateUrl: './committee-payments.component.html',
  styleUrls: ['./committee-payments.component.css']
})
export class CommitteePaymentsComponent implements OnInit {

  constructor(public paymentSer: PaymentService, public dayarSer: DayarService) { }
  cities: Cities[];

  toppings = new FormControl();
  payFor: string
  ngOnInit(): void {


    this.dayarSer.GetAllById(this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        this.dayarSer.listD = data;
        debugger
      },
      (err) => { console.log(err) }
    );

  }

  dayarSelectId: number = 0
  changeSelect(e) {
    debugger
    if (e == 0)
      this.dayarSer.listD.forEach(
        x => x.sendMail = (event.target as HTMLInputElement).checked

      )

  }
  send() {
    //  if(this.paymentSer.radioB1==true)
    this.paymentSer.sendMail(this.dayarSer.listD, this.payFor).subscribe(
      data => {
        if (data == null)
          Swal.fire('', "ארעה שגיאה בהבאת הנתונים", 'error');
      }, err => { Swal.fire('', err.message, 'error') })


  }
}
