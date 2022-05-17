import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Building } from 'src/app/classes/building';
import { Dayar } from 'src/app/classes/dayar';
import { BuildingService } from 'src/app/services/building.service';
import { DayarService } from 'src/app/services/dayar.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dayar-details',
  templateUrl: './dayar-details.component.html',
  styleUrls: ['./dayar-details.component.css']
})
export class DayarDetailsComponent implements OnInit {

  constructor(public dayarSer: DayarService, public buildingSer: BuildingService, public r: Router) { }
  dayar: Dayar = new Dayar()
  building: Building = new Building()

  ngOnInit(): void {
  }
  next(id: number) {

    this.dayar.NumFlat = this.buildingSer.counter + 1
    debugger
    this.dayar.PsWord = "1111";
    this.dayar.BuildingId = this.buildingSer.building.BuildingId;
    if (this.buildingSer.radioB1 == true)
      this.dayar.SumToMonth = this.buildingSer.sumClali
    this.dayarSer.addDayar(this.dayar).subscribe(
      data => {
        debugger
        if (data === null)
          // data.DayarId == this.dayarSer.dayar.DayarId+1
          Swal.fire('', "בעייה בהוספת דייר למערכת", 'error');
        else
          if (data.DayarId == -1)
            Swal.fire('', "מייל זה מופיע כבר במערכת", 'error');
          else {
            Swal.fire('', "דייר זה הוסף בהצלחה", 'success');
            if (this.buildingSer.flatHC == this.buildingSer.counter + 1) {
              this.buildingSer.counter += 2;
              this.dayarSer.listD.push(this.dayarSer.dayar)
            }
            else {
              this.buildingSer.counter += 1;
              this.dayarSer.listD.push(data)
            }
            if (id == 0 || this.buildingSer.numFlats == this.buildingSer.counter)
              this.r.navigate(['/headCommittee/bankAccount']);
            else
              this.r.navigate(['/headCommittee/dayarDetails']);
          }

      },
      err => { Swal.fire('', err.message, 'error') }
    )
  }

}
