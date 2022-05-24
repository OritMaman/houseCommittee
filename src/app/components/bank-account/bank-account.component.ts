import { Component, OnInit } from '@angular/core';
import { BankTransfers } from 'src/app/classes/bankTransfers';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { DayarService } from 'src/app/services/dayar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  constructor(public bankSer: BankAccountService, public dayarSer: DayarService) { }
  bankTransfers: BankTransfers = new BankTransfers()
  ngOnInit(): void {
  }
  next() {
    this.bankTransfers.BuildingId = this.dayarSer.dayar.BuildingId
    this.bankTransfers.DayarId = this.dayarSer.dayar.DayarId
    this.bankTransfers.YeteraOnOpen = 0
    debugger
    this.bankSer.addBankAccount(this.bankTransfers).subscribe(
      data => {
        debugger
        if (data === null)
          Swal.fire('', "בעייה בהוספת פרטי הבנק", 'error');
        else
          this.bankSer.bankAccount = data
      },
      err => { Swal.fire('', err.message, 'error') }
    )
    Swal.fire('',"אם אינך רוצה למלא כעת את פרטי חשבון ועד הבית תוכל למלא או לערוך ולהוסיף בהגדרות בכל עת בהמשך",'info')
  }
}
