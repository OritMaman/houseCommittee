import { Component, OnInit } from '@angular/core';
import { Building } from 'src/app/classes/building';
import { Cities } from 'src/app/classes/cities';
import { BuildingService } from 'src/app/services/building.service';
import { CitiesService } from 'src/app/services/cities.service';
import { DayarService } from 'src/app/services/dayar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-head-committee',
  templateUrl: './head-committee.component.html',
  styleUrls: ['./head-committee.component.css']
})
export class HeadCommitteeComponent implements OnInit {

  constructor(public d: DayarService, public buildingSer: BuildingService, public dayarSer: DayarService, public citiesSer: CitiesService) { }

  city: Cities = new Cities();
  ngOnInit(): void {
    this.d.dayar.FirstName
    this.d.dayar.LastName
    debugger
    if (this.dayarSer.dayar.BuildingId != undefined) {
      this.buildingSer.getAddress(this.dayarSer.dayar.BuildingId).subscribe(
        data => {
          debugger
          if (data == null)
            Swal.fire('', "ארעה שגיאה", 'error')
          else {
            this.buildingSer.buildingAddress = data;
            this.citiesSer.getNameCity(this.buildingSer.buildingAddress.CityId).subscribe(
              da => {
                debugger
                this.city = da;
              }, err => { Swal.fire('', err.message, 'error') })
          }
        }, err => { Swal.fire('', err.message, 'error') })

    }

  }
}
