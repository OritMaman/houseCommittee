import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dayar } from 'src/app/classes/dayar';
import { BuildingService } from 'src/app/services/building.service';
import { DayarService } from 'src/app/services/dayar.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor(public dayarSer: DayarService, public buildingSer: BuildingService, public r: Router, private location: Location) { }
  dayar: Dayar = new Dayar()
  pass1: string;
  pass2: string;
  ngOnInit(): void {
  }
  editPassword() {
    //this.dayarSer.dayar.DayarId
    if (this.pass1 == this.pass2 && this.pass2 != "") {
      this.dayarSer.editPassword(1355, this.pass2).subscribe(
        data => {
          if (data != null) {
            Swal.fire('', "!!הסיסמה שונתה בהצלחה",'success')
            this.location.back();
            // this.r.navigate['/home'];
          }
        }, err => { console.log(err); })
    }
    else
      Swal.fire('', "ווידוא סיסמא אינו תואם",'error')
  }



}
