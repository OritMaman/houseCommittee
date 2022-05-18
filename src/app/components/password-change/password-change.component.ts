import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(public dayarSer: DayarService, public buildingSer: BuildingService,
     public r: Router, private location: Location, public route: ActivatedRoute) { }
  dayar: Dayar = new Dayar()
  pass1: string;
  pass2: string;
  dayarId:number;
  ngOnInit(): void {
    debugger
    this.route.params.subscribe((paramsFromUrl: Params) => {
      this.dayarId = paramsFromUrl.dayarId;
      
    });
    debugger
  }
  editPassword() {
    //this.dayarSer.dayar.DayarId
    if (this.pass1 == this.pass2 && this.pass2 != "") {
      this.dayarSer.editPassword(this.dayarId, this.pass2).subscribe(
        data => {
          debugger
          if (data != null) {
            Swal.fire('', "!!הסיסמה שונתה בהצלחה",'success')
            this.location.back();
            // this.r.navigate['/home'];
          }
        }, err => { console.log(err); })
    }
    else
      Swal.fire('', "ווידוא סיסמה אינו תואם",'error')
  }



}
