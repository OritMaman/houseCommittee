import { Component, OnInit } from '@angular/core';
import { Takalot } from 'src/app/classes/takalot';
import { TakalotCategory } from 'src/app/classes/takalotCategory';
import { UrgencyLevel } from 'src/app/classes/urgencyLevel';
import { DayarService } from 'src/app/services/dayar.service';
import { TakalotService } from "src/app/services/takalot.service";
import { TakalotCategoryService } from "src/app/services/takalotCategory.service";
import { UrgencyLevelService } from "src/app/services/urgencyLevel.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faults',
  templateUrl: './faults.component.html',
  styleUrls: ['./faults.component.css']
})
export class FaultsComponent implements OnInit {

  constructor(private TakalotService: TakalotService,
    private TakalotCategoryService: TakalotCategoryService,
    private UrgencyLevelService: UrgencyLevelService,
    public dayarSer: DayarService) { }

  AllTakalot: Array<Takalot> = new Array<Takalot>()
  AllTakalotAfterSort: Array<Takalot> = new Array<Takalot>()
  AllTakalotCategory: Array<TakalotCategory> = new Array<TakalotCategory>()
  AllUrgencyLevel: UrgencyLevel[] = [];
  topics = ['תיאור', 'תאריך פתיחה', 'חומרה', 'האם טופל?', 'נפתח ע"י', 'קטגוריה', 'מספר תקלה'];
  editTakala: Takalot = new Takalot();
  ngOnInit(): void {
    this.TakalotService.GetAllById(this.dayarSer.dayar.BuildingId).subscribe(//this.TakalotService.GetAll().subscribe(
      data => {
        this.AllTakalot = data;
        this.AllTakalotAfterSort = data.sort(function (y, x) { return x.TakalotId - y.TakalotId });
        console.log("succ!");
        debugger
      },
      (err) => { console.log(err) }
    )

    this.TakalotCategoryService.GetAll().subscribe(
      data => {
        this.AllTakalotCategory = data;
        //console.log(data);
        debugger
      },
      (err) => { console.log(err) }
    )

    this.UrgencyLevelService.GetAll().subscribe(
      data => {

        this.AllUrgencyLevel = data;
        // console.log(data);
        debugger
      },
      (err) => { console.log(err) }
    )
  }
  changeOpen(e, takala: Takalot) {
    console.log(e.target.checked);
    if (e.target.checked == true)
      this.editTakala.OpenTakala = 1;
    else
      this.editTakala.OpenTakala = 0;
    console.log(this.editTakala);
    this.TakalotService.EditTakala(this.editTakala.OpenTakala, takala).subscribe(
      d => {
        debugger
        if (d == null)
          Swal.fire('',"ארעה שגיאה",'error')
        else {
          this.AllTakalot = d;
          this.AllTakalotAfterSort = d.sort(function (y, x) { return x.TakalotId - y.TakalotId });
        }
      }
    )
  }
  clear() {
    this.AllTakalotAfterSort = this.AllTakalot
  }

  sortByStatus(status: number) {
    this.TakalotService.GetTakalaByStatusId(status, this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        this.AllTakalotAfterSort = data
      },
      err => {
        console.log(err);
      }
    )

  }

  sortByUrgency(e) {
    debugger
    console.log(e.target.selectedIndex + 1);
    this.TakalotService.GetTakalaByUrgencyId(e.target.selectedIndex + 1, this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        this.AllTakalotAfterSort = data
      },
      err => {
        console.log(err);
      }
    )
  }

  sortByCategory(e) {
    debugger
    console.log(e.target.selectedIndex + 1);
    this.TakalotService.GetTakalaByCategoryId(e.target.selectedIndex + 1, this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        this.AllTakalotAfterSort = data
      },
      err => {
        console.log(err);
      }
    )
  }

}

