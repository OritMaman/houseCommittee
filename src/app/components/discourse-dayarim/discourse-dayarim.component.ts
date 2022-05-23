import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Building } from 'src/app/classes/building';
import { Dayar } from 'src/app/classes/dayar';
import { Messages } from 'src/app/classes/messages';
import { BuildingService } from 'src/app/services/building.service';
import { DayarService } from 'src/app/services/dayar.service';
import { MessagesService } from 'src/app/services/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discourse-dayarim',
  templateUrl: './discourse-dayarim.component.html',
  styleUrls: ['./discourse-dayarim.component.css']
})
export class DiscourseDayarimComponent implements OnInit {
  message: Messages = new Messages()
  building: Building;
  dayar: Dayar = new Dayar()
  constructor(public messageSer: MessagesService, public dayarSer: DayarService, public buildingSer: BuildingService) { }

  ngOnInit(): void {
    this.getList()
  }
  
  getList(): void {
    this.messageSer.getAllMessages(this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        // alert("שליפת ההודעות הוצלחה");
        this.messageSer.listMessages = data;

        this.messageSer.listMessages = this.messageSer.listMessages.sort(function (y, x) { return x.MessagesId - y.MessagesId })
      },
      (err) => { console.log(err) }
    );
  }
  addMessage() {

    debugger
    this.message.BuildingId = this.dayarSer.dayar.BuildingId
    this.message.DayarId = this.dayarSer.dayar.DayarId
    this.message.SenderName = this.dayarSer.dayar.FirstName + ' ' + this.dayarSer.dayar.LastName
    // this.message.DateMessage = Date.now.
    //חישובים על השעה ותאריך
    debugger
    this.messageSer.AddMessage(this.message).subscribe(
      data => {
        debugger
        if (data === null)
          Swal.fire('', "בעייה בהוספת הודעה", 'error');
        else {
          // alert("הודעה הוספה בצלחה");
          this.messageSer.message = data
          this.getList()

        }
      },
      err => { Swal.fire('', err.message, 'error') }

    )
  }

}
