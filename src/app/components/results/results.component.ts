import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/services/surveys.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Surveys } from 'src/app/classes/surveys';
import { ResponseService } from 'src/app/services/response.service';
import { DayarService } from 'src/app/services/dayar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(public surveysSer: SurveysService, private location: Location, public route: ActivatedRoute, public responseSer: ResponseService, public dayarSer: DayarService) { }
  surveyId: number;
  survey: Surveys = new Surveys()
  isShow: boolean = false

  ngOnInit(): void {
    this.route.params.subscribe((paramsFromUrl: Params) => {
      this.surveyId = paramsFromUrl.surveyId;
      this.survey = this.surveysSer.listS.find(x => x.SurveyId == this.surveyId)
    });
    // this.surveysSer.surveysToEnter.Op1
    // this.surveysSer.surveysToEnter.Op2
  }
  back() {
    this.location.back();
  }
  showTheResponses() {
    //שליפת התגובות

    this.responseSer.getAllResponses(this.survey.SurveyId).subscribe(
      data => {
        debugger
        Swal.fire('', "שליפת ההודעות הוצלחה", 'success');
        this.responseSer.listResponses = data;
        this.isShow = true
      },
      (err) => { console.log(err) }
    );

  }
}


