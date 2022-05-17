import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Building } from 'src/app/classes/building';
import { BuildingService } from 'src/app/services/building.service';
import { DayarService } from 'src/app/services/dayar.service';
import Swal from 'sweetalert2';
import { Dayar } from '../../classes/dayar';
//import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-dayarim',
  templateUrl: './list-dayarim.component.html',
  styleUrls: ['./list-dayarim.component.css']
})
export class ListDayarimComponent implements OnInit {

  private list;
  constructor(public dayarSer: DayarService, public buildingSer: BuildingService, public r: Router) { }

  topics = ['עריכה', 'חשבון חודשי', 'אמייל', 'טלפון', 'דירה', 'שם משפחה', 'שם פרטי'];
  topics2 = ['אמייל', 'טלפון', 'דירה', 'שם משפחה', 'שם פרטי'];
  dayar: Dayar
  dayarToEdit: Dayar;
  isShow: boolean = true;
  listD1: Array<Dayar> = new Array<Dayar>()
  nameforSearch: any
  index = 0;
  searchValue: any;


  //@ViewChild('paginator') paginator:MatPaginator;

  ngOnInit(): void {
    this.getList();

  }
  getList(): void {
    this.dayarSer.GetAllById(this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        this.dayarSer.listD = data;
        debugger
      },
      (err) => { console.log(err) }
    );
  }
  back() {
    this.getList();
  }

  edit(dayar: Dayar) {
    this.dayarToEdit = dayar;
    this.isShow = false;
  }

  search: string
  sortByName() {
    debugger
    this.dayarSer.SortByName(this.search, this.dayarSer.dayar.BuildingId).subscribe(data => { this.dayarSer.listD = data; }, err => { console.log(err); })
  }
  onMySave(dayarEdit: Dayar) {
    debugger

    //var index = this.dayarSer.listD.findIndex(x => x.DayarId==dayarEdit.DayarId)
    //this.dayarSer[index] = dayarEdit;
    if (dayarEdit != null) {
      this.dayarSer.EditDayar(dayarEdit).subscribe(
        d => {
          if (d == null)
            Swal.fire('', "מייל זה מופיע במערכת או שאינו חוקי נא הכנס מייל אחר", 'error')
          else {
            this.isShow = true;
            this.dayarSer.listD = d
            // this.r.navigate['/headCommittee/list-dayarim'];
            this.getList();
          }
        },
        err => { console.log(err); }
      )
    }
    else
      this.isShow = true;
  }

  quickSearch() {
    debugger
    this.list.setQuickFilter(this.searchValue);
  }

  onKey(event: any) {
    this.listD1 = []
    this.dayarSer.listD.forEach(element => {
      if (element.FirstName.startsWith(event.target.value) || element.LastName.startsWith(event.target.value) ||
        element.Phone.startsWith(event.target.value) || element.MailAddress.startsWith(event.target.value)) {
        this.listD1.push(element)
      }
    });
  }

}
