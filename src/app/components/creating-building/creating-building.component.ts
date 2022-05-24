import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities } from 'src/app/classes/cities';
import { Deshbord } from 'src/app/classes/deshbord';
import { BuildingService } from 'src/app/services/building.service';
import { CitiesService } from 'src/app/services/cities.service';
import { DayarService } from 'src/app/services/dayar.service';
import { DeshbordService } from 'src/app/services/deshbord.service';
import Swal from 'sweetalert2';
import { Building } from '../../classes/building';

@Component({
  selector: 'app-creating-building',
  templateUrl: './creating-building.component.html',
  styleUrls: ['./creating-building.component.css']
})
export class CreatingBuildingComponent implements OnInit {

  constructor(public buildingSer: BuildingService, public dayarSer: DayarService, public citiesSer: CitiesService, public r: Router, public deshbordSer: DeshbordService) { }
  building: Building = new Building()
  listOfCities: Cities[] = [];
  deshbord: Deshbord = new Deshbord();
  ngOnInit(): void {
    this.getCities();
    this.building.CityId = 0;
  }

  getCities(): void {
    this.citiesSer.GetAllCities().subscribe(
      data => {
        this.listOfCities = data
      },
      (err) => { console.log(err) }
    );
  };

  next() {
    //debugger
    //if(this.building.city == null || this.building.Street == null ||this.building.NumBuilding == null ||
    //this.building.Flats == null)
    //alert("נא למלא את כל הפרטים");
    //else
    //{ 
    debugger
    if (this.buildingSer.numFlats < this.buildingSer.flatHC)
      Swal.fire('', "לא יתכן שמספר הדירות בבנין קטן ממספר הדירה של ועד הבית", 'error');
    else
      this.building.idCom = this.dayarSer.dayar.DayarId

    this.buildingSer.addBuilding(this.building).subscribe(
      data => {
        debugger
        if (data === null)
          Swal.fire('', "בעייה בהוספת הבניין", 'error');//הוא מוסיף לי את הבניין למרות שתיבות הטקסט ריקות..
        else {
          //Swal.fire('', "בניין זה נוסף בהצלחה", 'success');
          this.buildingSer.building = data
          this.dayarSer.dayar.BuildingId = this.buildingSer.building.BuildingId
          this.citiesSer.getNameCity(this.building.CityId).subscribe(
            da => {
              debugger
              this.buildingSer.city = da;
            }, err => { Swal.fire('', err.message, 'error') })
          if (this.buildingSer.radioB1 == false)
            this.buildingSer.sumClali = 0;
          this.dayarSer.dayar.SumToMonth = this.buildingSer.sumClali
          this.dayarSer.addDayarim(this.buildingSer.numFlats, this.dayarSer.dayar).subscribe(
            data => {
              if (data === false)
                Swal.fire('', "בעייה בהוספת הדיירים למערכת", 'error');
              else {
                this.deshbord.Hachnasot = 0;
                this.deshbord.Hotzaot = 0;
                this.deshbord.Yetera = 0;
                this.deshbord.TakalotBetipul = 0;
                this.deshbord.TakalotShenisgeru = 0;
                this.deshbord.BuildingId = this.dayarSer.dayar.BuildingId;
                this.deshbord.DayarId = this.dayarSer.dayar.DayarId;

                this.deshbordSer.addDeshbord(this.deshbord).subscribe(
                  data => {
                    if (data === null)
                      Swal.fire('', "בעייה בהוספת הלוח נתונים", 'error');
                    else
                      this.deshbordSer.deshbord = data
                  },
                  err => { Swal.fire('', err.message, 'error') }
                )
               
                this.r.navigate(['/headCommittee/bankAccount']);
              }

            },
            err => { Swal.fire('', err.message, 'error') }
          )
        }


      }

      // this.city 
      // this.buildingSer.buildingAddress
      // },
      //err=>{alert(err)}
    )
  }

  //בדיקה שכל התיבות טקסט מלאות
  //שהמייל לא נמצא במערכת וגם שהוא תקין
  // ושהסיסמא והווידוא סיסמא תואמים
  //  }

}
