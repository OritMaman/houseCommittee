import { Component, OnInit } from '@angular/core';
import { BankTransfers } from 'src/app/classes/bankTransfers';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { DayarService } from 'src/app/services/dayar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-transfers',
  templateUrl: './bank-transfers.component.html',
  styleUrls: ['./bank-transfers.component.css']
})
export class BankTransfersComponent implements OnInit {

  bankTransfers: BankTransfers = new BankTransfers()
  constructor(public bankSer: BankAccountService, public dayarSer: DayarService) { }
  isShow: boolean = true;
  ngOnInit(): void {
    this.get();
  }
  get() {
    this.bankSer.getBankTransfers(this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        debugger
        if (data == null)
          Swal.fire('', "ארעה שגיאה בהבאת הנתונים", 'error');
        else
          this.bankTransfers = data;
      }, err => { Swal.fire('', err.message, 'error') })
  }
  show() {
    this.isShow = false;
  }
  save() {
    this.bankSer.editBankTransfers(this.bankTransfers).subscribe(
      d => {
        debugger
        if (d == null)
          Swal.fire('', "ארעה שגיאה בהבאת הנתונים", 'error');
        else {
          this.bankTransfers = d;
          this.isShow = true;
        }
      }, err => { Swal.fire('', err.message, 'error') })
  }
  back() {
    this.isShow = true;
  }
}
