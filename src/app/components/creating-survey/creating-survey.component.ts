import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dayar } from '../../classes/dayar';
import { DayarService } from '../../services/dayar.service';
import { Location } from '@angular/common';
import { Surveys } from '../../classes/surveys';
import { SurveysService } from '../../services/surveys.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creating-survey',
  templateUrl: './creating-survey.component.html',
  styleUrls: ['./creating-survey.component.css']
})
export class CreatingSurveyComponent implements OnInit {
  dayar: Dayar = new Dayar()
  survey: Surveys = new Surveys()
  constructor(public dayarSer: DayarService, public surveysSer: SurveysService, public r: Router, public location: Location) { }
  numDays: number;
  ngOnInit(): void {
    this.survey.Type = null
  }
  //saveSurvey(){
  //  this.survey.BuildingId = this.dayarSer.dayar.BuildingId
  // this.survey.DayarId = this.dayarSer.dayar.DayarId
  //  this.survey.Content = "try"//לשנות במסד
  //  debugger
  //  this.surveysSer.addSurvey(this.survey).subscribe(
  //   data=>{
  //     debugger
  //        if(data===null)
  //       alert("בעייה בהוספת הסקר");
  //      else
  //        {
  //            alert("הסקר הוסף בצלחה");
  //            this.surveysSer.survey=data
  //         }   
  //           }, err=>{alert(err)} )  
  //          // this.getList()
  //    debugger             
  //    this.dayarSer.isShow=true
  //   this.r.navigate(['/headCommittee/surveys']); 
  // }
  addOp() {
    debugger
    if (this.surveysSer.numOp < 4)
      this.surveysSer.numOp += 1
  }
  back() {
    this.location.back();
  }
  lessOp() {
    this.surveysSer.numOp -= 1
  }
  saveSurvey() {

    this.survey.BuildingId = this.dayarSer.dayar.BuildingId
    this.survey.DayarId = this.dayarSer.dayar.DayarId
    this.survey.NumAnswers = 0
    this.survey.Re1 = 0
    this.survey.Re2 = 0
    this.survey.Re3 = 0
    this.survey.Re4 = 0
    this.survey.Re5 = 0
    this.survey.Re6 = 0
    this.survey.NumOp = this.surveysSer.numOp
    //  this.survey.EndDate.getDay.length+this.numDays;
    //  this.survey.ExpireDate =  this.survey.EndDate;
    debugger
    this.surveysSer.addSurvey(this.survey).subscribe(
      data => {
        debugger
        if (data === null)
          Swal.fire('', "בעייה בהוספת הסקר", 'error');
        else {
        //  Swal.fire('', "הסקר הוסף בצלחה", 'success');
          debugger
          this.surveysSer.survey = data
          this.r.navigate(['/headCommittee/surveys']);

        }
      },
      err => { Swal.fire('', err.message, 'error') }

    )
  }
}
