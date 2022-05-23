import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Building } from 'src/app/classes/building';
import { Cities } from 'src/app/classes/cities';
import { BuildingService } from 'src/app/services/building.service';
import { CitiesService } from 'src/app/services/cities.service';
import { DayarService } from 'src/app/services/dayar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dayar',
  templateUrl: './dayar.component.html',
  styleUrls: ['./dayar.component.css']
})
export class DayarComponent implements OnInit {

  constructor(public router:Router,public d: DayarService, public buildingSer: BuildingService, public dayarSer: DayarService, public citiesSer: CitiesService) { }
  building: Building;
  city: Cities = new Cities();
  ngOnInit(): void {
    this.d.dayar.FirstName
    this.d.dayar.LastName

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
              }, err => { Swal.fire('',  JSON.stringify(err), 'error') })
          }
        }, err => { Swal.fire('', err.message, 'error') })

    }

  }
  logout(){
    this.router.navigateByUrl('');
  }
}
