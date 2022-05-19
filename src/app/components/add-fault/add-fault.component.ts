import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deshbord } from 'src/app/classes/deshbord';
import { Takalot } from 'src/app/classes/takalot';
import { TakalotCategory } from 'src/app/classes/takalotCategory';
import { UrgencyLevel } from 'src/app/classes/urgencyLevel';
import { BuildingService } from 'src/app/services/building.service';
import { DayarService } from 'src/app/services/dayar.service';
import { DeshbordService } from 'src/app/services/deshbord.service';
import { TakalotService } from "src/app/services/takalot.service";
import { TakalotCategoryService } from "src/app/services/takalotCategory.service";
import { UrgencyLevelService } from "src/app/services/urgencyLevel.service";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-fault',
  templateUrl: './add-fault.component.html',
  styleUrls: ['./add-fault.component.css']
})
export class AddFaultComponent implements OnInit {

  constructor(private TakalotService: TakalotService,
    private TakalotCategoryService: TakalotCategoryService,
    private UrgencyLevelService: UrgencyLevelService, 
    public r :Router,
    public buildingSer: BuildingService,
    public dayarSer: DayarService,
    public deshbordSer: DeshbordService) { }

  AllTakalotCategory: Array<TakalotCategory> = new Array<TakalotCategory>();
  AllUrgencyLevel: Array<UrgencyLevel> = new Array<UrgencyLevel>();
  newTakala: Takalot = new Takalot();

  // <select id="city" name="listOfCities" [(ngModel)]="building.CityId">
  //       <option value="0" disabled>בחר עיר</option>
  //         <option *ngFor="let city of listOfCities" [ngValue]="city.CityId"> {{city.CityName}}</option>
  //     </select >

  ngOnInit(): void {

this.newTakala.TakalaDescription
    this.TakalotCategoryService.GetAll().subscribe(
      data => {
        this.AllTakalotCategory = data;
        console.log(this.AllTakalotCategory);
        debugger
      },
      err => {
        console.log(err);
      }
    )

    this.UrgencyLevelService.GetAll().subscribe(
      data => {
        this.AllUrgencyLevel = data;
        console.log(this.AllUrgencyLevel);
        debugger
      },
      err => {
        console.log(err);

      }
    )
  }


  // changeOpen(e) {
  //   console.log(e.target.checked);
  //   if(e.target.checked==true)
  //   this.newTakala.OpenTakala = 1;
  //   else
  //   this.newTakala.OpenTakala = 0;
  //   console.log(this.newTakala);
  // }


  selectByCategory(e) {
    debugger
    console.log(e.target.selectedIndex);
    this.newTakala.TakalotCategoryId=e.target.selectedIndex
    console.log(this.newTakala);
  }


  chooseUrgency(e){
    debugger
    console.log(e.target.selectedIndex);
    this.newTakala.UrgencyLevelId=e.target.selectedIndex
    console.log(this.newTakala);
  }


  OKTakala() {
    debugger
    if(this.newTakala.OpenTakala==undefined)
    this.newTakala.OpenTakala=1
    this.newTakala.DayarId = this.dayarSer.dayar.DayarId
    this.newTakala.OpenTakala = 0;
    this.newTakala.BuildingId = this.dayarSer.dayar.BuildingId
    debugger
    if( this.newTakala.TakalaDescription==undefined)
        Swal.fire('', "עליך למלא את כל השדות", 'error');
    else{
    this.TakalotService.AddTakala(this.newTakala).subscribe(
      data => {
        this.r.navigate(['/headCommittee/faults']);
      debugger
        console.log("succ!!");
      },
      err => {
        console.log("try again...:(");
      }
    )}
  }

}
