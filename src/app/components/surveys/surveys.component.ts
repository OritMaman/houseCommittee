import { Component, OnInit } from '@angular/core';
import { Surveys } from 'src/app/classes/surveys';
import { DayarService } from 'src/app/services/dayar.service';
import { SurveysService } from 'src/app/services/surveys.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  constructor(public dayarSer: DayarService, public surveysSer: SurveysService) { }

  isShow: boolean = true;

  ngOnInit(): void {
    //this.surveysSer.surveysToEnter.NumAnswers
    this.getList();
  }
  getList(): void {

    this.surveysSer.GetAllById(this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        debugger
        this.surveysSer.listS = data.sort(function (y, x) { return x.SurveyId - y.SurveyId });
        //for(var i=0 ;i<this.surveysSer.listS.length;i++){
        // if(this.surveysSer.listS[i].NumAnswers==null)
        // this.surveysSer.listS[i].NumAnswers=0;}


      },
      (err) => { console.log(err) }
    );
  }

  deleteSurvey(surveyId: number, buildingId: number) {
    this.surveysSer.DeleteSurvey(surveyId, buildingId).subscribe(
      data => { this.surveysSer.listS = data.sort(function (y, x) { return x.SurveyId - y.SurveyId }); },
      err => { console.log(err); }
    )
  }
  // enter(survey:Surveys){
  //   debugger
  //   this.surveysSer.surveysToEnter = survey;

  // }
  creat(survey: Surveys) {

    //שליחה במייל לכל הדיירים
    this.surveysSer.SendSurvey(survey).subscribe(
      data => {
        debugger
        if (data == true)
          Swal.fire('', "ברגעים אלו נשלח לדיירים הסקר:  " + survey.SubSurvey, 'success')
        else
          Swal.fire('', "יש בעייה בשליחת הסקר לדיירים", 'error')
      }, err => { console.log(err); })
  }

}

