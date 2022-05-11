import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Cities } from 'src/app/classes/cities';
import { DayarService } from 'src/app/services/dayar.service';
import { PaymentService } from 'src/app/services/payment.service';
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

  ngOnInit(): void {


    this.dayarSer.GetAllById(this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        this.dayarSer.listD = data;
        debugger
      },
      (err) => { console.log(err) }
    );

  }
  
  dayarSelectId:number=0
  changeSelect(e) {
    debugger
    if (e==0)
      this.dayarSer.listD.forEach(
        x => x.sendMail = (event.target as HTMLInputElement).checked

      )

    // else {
    //   let d = this.dayarSer.listD.find(x => x.DayarId == e)
    //   d.sendMail = !d.sendMail

    // }
  }
  send(){
    if(this.paymentSer.radioB1==true)
    {
      for(var i = 0; i < this.dayarSer.listD.length;i++){
        if(this.dayarSer.listD[i].sendMail)
        this.paymentSer.sendMail(this.dayarSer.listD[i].MailAddress).subscribe(
          data=>{
            debugger
            if(data==null)
            alert("problem")
            else
            alert("yesssss")
          },err=>{alert(err)})
      }
      // this.paymentSer.sendMail(this.dayarSer.listD).subscribe(
      //   data=>{
      //     if(data==null)
      //     alert("problem")
      //   },err=>{alert(err)})
    
    }
  }
}
