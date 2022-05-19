import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingService } from 'src/app/services/building.service';
import Swal from 'sweetalert2';
import { Dayar } from '../../classes/dayar';
import { DayarService } from '../../services/dayar.service';

@Component({
  selector: 'app-newCommittee',
  templateUrl: './newCommittee.component.html',
  styleUrls: ['./newCommittee.component.css']
})
export class NewCommitteeComponent implements OnInit {

  constructor(public dayarSer: DayarService, public buildingSer: BuildingService, public r: Router) { }
  dayar: Dayar = new Dayar()
  verifyCode1: string;
  //dayar.PsWord:string;
  ngOnInit(): void {
  }
  begain() {//דרוש בדיקה
    debugger
    if (this.dayar.FirstName == null || this.dayar.LastName == null || this.dayar.MailAddress == null || this.dayar.Phone == null ||
      this.dayar.PsWord == null)
      Swal.fire('', "נא למלא את כל הפרטים", 'warning');
    else
      if (this.dayar.PsWord != this.verifyCode1)
        Swal.fire('', "ווידוא סיסמא אינו תואם לסיסמא", 'warning');
      else {
        debugger
        this.dayar.IsHouseCommittee = true
        this.dayarSer.addDayar(this.dayar).subscribe(
          data => {
            debugger
            if (data === null)
              Swal.fire('', "בעייה בכניסה למערכת", 'error');
            else
              if (data.DayarId == -1)//?
                Swal.fire('', "מייל זה מופיע כבר במערכת", 'error');
              else {
                // Swal.fire('', "דייר זה הוסף בהצלחה", 'success');
                this.dayarSer.dayar = data

                this.r.navigate(['/headCommittee']);
              }

          },
          err => { Swal.fire('', err.message, 'error') }
        )
      }

    //בדיקה שכל התיבות טקסט מלאות
    //שהמייל לא נמצא במערכת וגם שהוא תקין
    // ושהסיסמא והווידוא סיסמא תואמים
  }
}
