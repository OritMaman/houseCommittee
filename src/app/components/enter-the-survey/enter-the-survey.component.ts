import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/services/surveys.service';
import { Location } from '@angular/common';
import { Surveys } from 'src/app/classes/surveys';
import { ActivatedRoute, Params } from '@angular/router';
import { DayarService } from 'src/app/services/dayar.service';
import { BuildingService } from 'src/app/services/building.service';
import { Responses } from 'src/app/classes/responses';
import { ResponseService } from 'src/app/services/response.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { SurveyResultsService } from 'src/app/services/surveyResultsService.service';
import { SurveyResults } from 'src/app/classes/surveyResults';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enter-the-survey',
  templateUrl: './enter-the-survey.component.html',
  styleUrls: ['./enter-the-survey.component.css']
})
export class EnterTheSurveyComponent implements OnInit {

  constructor(public surveysSer: SurveysService, private location: Location,
    public route: ActivatedRoute, public dayarSer: DayarService,
    public buildingSer: BuildingService, public responseSer: ResponseService, public surveyResultsSer: SurveyResultsService) { }
  surveyId: number;
  respose: Responses = new Responses()
  survey: Surveys = new Surveys()
  surveyResults: SurveyResults = new SurveyResults()
  ngOnInit(): void {
    this.route.params.subscribe((paramsFromUrl: Params) => {
      this.surveyId = paramsFromUrl.surveyId;
      this.survey = this.surveysSer.listS.find(x => x.SurveyId == this.surveyId);
      if (this.survey.Type === 'בחירה ייחודית') { this.surveysSer.radioB = 1; }

    });
    debugger
  }
  // this.getList();
  // getList():void{

  //   this.surveysSer.GetAllById(109).subscribe(
  //     data => {
  //       debugger                   
  //       this.surveysSer.listS = data.sort(function(y,x) {return x.SurveyId-y.SurveyId});
  //       //for(var i=0 ;i<this.surveysSer.listS.length;i++){
  //        // if(this.surveysSer.listS[i].NumAnswers==null)
  //        // this.surveysSer.listS[i].NumAnswers=0;}


  //     },
  //    (err) => {console.log(err)}
  //   );
  // }
  // funOp1(Op1:string){
  //   this.survey.Result = Op1;
  // }
  // funOp2(Op2:string){
  //   this.survey.Result = Op2;
  // }
  save() {
    debugger
    if (this.survey.Type == 'בחירה ייחודית') {
      this.surveyResults.SurveyId = this.survey.SurveyId
      this.surveyResults.DayarId = this.dayarSer.dayar.DayarId
      debugger

      if (this.surveysSer.radioB === 1) {
        this.surveyResults.FinallAnswer = this.survey.Op1
        this.surveyResultsSer.CheckDayarResult(this.surveyResults.DayarId, this.survey).subscribe(
          d => {
            if (d === true) {//עידכון תוצאה אם הוא מצא שהדייר ענה כבר על הסקר
              this.surveyResultsSer.EditResult(this.surveyResults).subscribe(
                data => {

                  if (data == null)
                    Swal.fire('', "יש בעייה", 'error')
                  else {
                    Swal.fire('', "עודכנה תוצאה חדשה מדייר זה", 'success')
                    this.location.back();
                  }
                },
                err => { console.log(err); }
              )
            }
            if (d == false) {
              debugger
              //הוספת תוצאה חדשה
              this.surveyResultsSer.AddResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data === null)
                    Swal.fire('', "בעייה בהוספת התוצאה", 'error')
                  else
                    this.survey.Re1 += 1;
                  this.survey.NumAnswers = this.survey.Re1 + this.survey.Re2 + this.survey.Re3 + this.survey.Re4 + this.survey.Re5 + this.survey.Re6;

                  this.surveysSer.EditSurvey(this.survey).subscribe(
                    d => {
                      debugger
                      if (d === null)
                        Swal.fire('', "בעייה בעידכון הסקר", 'error');
                      else
                        this.location.back();
                    },
                    err => { console.log(err); }
                  )


                }, err => { console.log(err); })

            }

          }, err => { console.log(err); })
      }
      if (this.surveysSer.radioB === 2) {
        {
          this.surveyResults.FinallAnswer = this.survey.Op2
          this.surveyResultsSer.CheckDayarResult(this.surveyResults.DayarId, this.survey).subscribe(
            d => {
              if (d === true) {//עידכון תוצאה אם הוא מצא שהדייר ענה כבר על הסקר
                this.surveyResultsSer.EditResult(this.surveyResults).subscribe(
                  data => {
                    debugger
                    if (data == null)
                      Swal.fire('', "יש בעייה", 'error')
                    else
                      debugger
                    {
                      Swal.fire('', "עודכנה תוצאה חדשה מדייר זה", 'success')
                      // this.survey.Re1 += 1;
                      // this.survey.Re2 -= 1;
                      this.location.back();
                    }
                  },
                  err => { console.log(err); }
                )
              }
              if (d == false) {
                debugger
                //הוספת תוצאה חדשה
                this.surveyResultsSer.AddResult(this.surveyResults).subscribe(
                  data => {
                    debugger
                    if (data === null)
                      Swal.fire('', "בעייה בהוספת התוצאה", 'error')
                    else
                      this.survey.Re2 += 1;
                    this.survey.NumAnswers = this.survey.Re1 + this.survey.Re2 + this.survey.Re3 + this.survey.Re4 + this.survey.Re5 + this.survey.Re6;

                    this.surveysSer.EditSurvey(this.survey).subscribe(
                      d => {
                        debugger
                        if (d === null)
                          Swal.fire('', "בעייה בעידכון הסקר", 'error');
                        else
                          this.location.back();
                      },
                      err => { console.log(err); }
                    )


                  }, err => { console.log(err); })

              }


            }, err => { console.log(err); })

        }

      }

      //  this.survey.Re2 += 1
      // this.surveysSer.surveysToEnter.NumAnswers = this.surveysSer.surveysToEnter.Re1 + this.surveysSer.surveysToEnter.Re2;
      if (this.surveysSer.radioB === 3) {
        this.surveyResults.FinallAnswer = this.survey.Op3
        this.surveyResultsSer.CheckDayarResult(this.surveyResults.DayarId, this.survey).subscribe(
          d => {
            if (d === true) {//עידכון תוצאה אם הוא מצא שהדייר ענה כבר על הסקר
              this.surveyResultsSer.EditResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data == null)
                    Swal.fire('', "יש בעייה", 'error')
                  else
                    debugger
                  {
                    Swal.fire('', "עודכנה תוצאה חדשה מדייר זה", 'success')
                    // this.survey.Re1 -= 1;
                    // this.survey.Re2 += 1;
                    this.location.back();
                  }
                },
                err => { console.log(err); }
              )
            }
            if (d == false) {
              debugger
              //הוספת תוצאה חדשה
              this.surveyResultsSer.AddResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data === null)
                    Swal.fire('', "בעייה בהוספת התוצאה", 'error')
                  else
                    this.survey.Re3 += 1;
                  this.survey.NumAnswers = this.survey.Re1 + this.survey.Re2 + this.survey.Re3 + this.survey.Re4 + this.survey.Re5 + this.survey.Re6;

                  this.surveysSer.EditSurvey(this.survey).subscribe(
                    d => {
                      debugger
                      if (d === null)
                        Swal.fire('', "בעייה בעידכון הסקר", 'error');
                      else
                        this.location.back();
                    },
                    err => { console.log(err); }
                  )


                }, err => { console.log(err); })

            }

          }, err => { console.log(err); })
      }
      if (this.surveysSer.radioB === 4) {
        this.surveyResults.FinallAnswer = this.survey.Op4
        this.surveyResultsSer.CheckDayarResult(this.surveyResults.DayarId, this.survey).subscribe(
          d => {
            if (d === true) {//עידכון תוצאה אם הוא מצא שהדייר ענה כבר על הסקר
              this.surveyResultsSer.EditResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data == null)
                    Swal.fire('', "יש בעייה", 'error')
                  else
                    debugger
                  {
                    Swal.fire('', "עודכנה תוצאה חדשה מדייר זה", 'success')
                    // this.survey.Re1 -= 1;
                    // this.survey.Re2 += 1;
                    this.location.back();
                  }
                },
                err => { console.log(err); }
              )
            }
            if (d == false) {
              debugger
              //הוספת תוצאה חדשה
              this.surveyResultsSer.AddResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data === null)
                    Swal.fire('', "בעייה בהוספת התוצאה", 'error')
                  else
                    this.survey.Re4 += 1;
                  this.survey.NumAnswers = this.survey.Re1 + this.survey.Re2 + this.survey.Re3 + this.survey.Re4 + this.survey.Re5 + this.survey.Re6;

                  this.surveysSer.EditSurvey(this.survey).subscribe(
                    d => {
                      debugger
                      if (d === null)
                        Swal.fire('', "בעייה בעידכון הסקר", 'error')
                      else
                        this.location.back();
                    },
                    err => { console.log(err); }
                  )


                }, err => { console.log(err); })

            }

          }, err => { console.log(err); })
      }
      if (this.surveysSer.radioB === 5) {
        this.surveyResults.FinallAnswer = this.survey.Op5
        this.surveyResultsSer.CheckDayarResult(this.surveyResults.DayarId, this.survey).subscribe(
          d => {
            if (d === true) {//עידכון תוצאה אם הוא מצא שהדייר ענה כבר על הסקר
              this.surveyResultsSer.EditResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data == null)
                    Swal.fire('', "יש בעייה", 'error')
                  else
                    debugger
                  {
                    Swal.fire('', "עודכנה תוצאה חדשה מדייר זה", 'success')
                    // this.survey.Re1 -= 1;
                    // this.survey.Re2 += 1;
                    this.location.back();
                  }
                },
                err => { console.log(err); }
              )
            }
            if (d == false) {
              debugger
              //הוספת תוצאה חדשה
              this.surveyResultsSer.AddResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data === null)
                    Swal.fire('', "בעייה בהוספת התוצאה", 'error')
                  else
                    this.survey.Re5 += 1;
                  this.survey.NumAnswers = this.survey.Re1 + this.survey.Re2 + this.survey.Re3 + this.survey.Re4 + this.survey.Re5 + this.survey.Re6;

                  this.surveysSer.EditSurvey(this.survey).subscribe(
                    d => {
                      debugger
                      if (d === null)
                        Swal.fire('', "בעייה בעידכון הסקר", 'error')
                      else
                        this.location.back();
                    },
                    err => { console.log(err); }
                  )


                }, err => { console.log(err); })

            }

          }, err => { console.log(err); })
      }

      if (this.surveysSer.radioB === 6) {
        this.surveyResults.FinallAnswer = this.survey.Op6
        this.surveyResultsSer.CheckDayarResult(this.surveyResults.DayarId, this.survey).subscribe(
          d => {
            if (d === true) {//עידכון תוצאה אם הוא מצא שהדייר ענה כבר על הסקר
              this.surveyResultsSer.EditResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data == null)
                    Swal.fire('', "יש בעייה", 'error')
                  else
                    debugger
                  {
                    Swal.fire('', "עודכנה תוצאה חדשה מדייר זה", 'success')
                    // this.survey.Re1 -= 1;
                    // this.survey.Re2 += 1;
                    this.location.back();
                  }
                },
                err => { console.log(err); }
              )
            }
            if (d == false) {
              debugger
              //הוספת תוצאה חדשה
              this.surveyResultsSer.AddResult(this.surveyResults).subscribe(
                data => {
                  debugger
                  if (data === null)
                    Swal.fire('', "בעייה בהוספת התוצאה", 'error')
                  else
                    this.survey.Re6 += 1;
                  this.survey.NumAnswers = this.survey.Re1 + this.survey.Re2 + this.survey.Re3 + this.survey.Re4 + this.survey.Re5 + this.survey.Re6;

                  this.surveysSer.EditSurvey(this.survey).subscribe(
                    d => {
                      debugger
                      if (d === null)
                        Swal.fire('', "בעייה בעידכון הסקר", 'error')
                      else
                        this.location.back();
                    },
                    err => { console.log(err); }
                  )


                }, err => { console.log(err); })

            }

          }, err => { console.log(err); })
      }
    }

    debugger
    if (this.survey.Type == 'טקסט חופשי') {
      this.respose.SurveyId = this.survey.SurveyId
      this.respose.SenderName = this.dayarSer.dayar.FirstName + ' ' + this.dayarSer.dayar.LastName
      this.respose.DayarId = this.dayarSer.dayar.DayarId
      debugger
      this.responseSer.CheckDayarRespose(this.respose.DayarId, this.survey).subscribe(
        data => {
          debugger
          if (data == true) {
            debugger
            this.responseSer.EditResponse(this.respose).subscribe(
              data => {
                debugger
                if (data == null)
                  Swal.fire('', "יש בעייה", 'error')
                else

                  //this.responseSer.listResponses = data
                  debugger
                Swal.fire('', "עודכנה תגובה חדשה מדייר זה", 'success')
                this.location.back();
              },
              err => { console.log(err); }
            )
          }
          if (data == false) {
            debugger
            this.responseSer.AddRespose(this.respose).subscribe(
              data => {
                debugger
                if (data === null)
                  Swal.fire('', "בעייה בהוספת התגובה", 'error')
                else {
                  Swal.fire('', "התגובה הוספה בצלחה", 'success')
                  this.survey.NumAnswers += 1
                  this.surveysSer.EditSurvey(this.survey).subscribe(
                    d => {
                      debugger
                      if (d === null)
                        Swal.fire('', "בעייה בעידכון התגובה", 'error')
                      else {
                        Swal.fire('', "העידכון עבר בהצלחה", 'success')
                        this.responseSer.response = data
                        this.location.back();
                      }
                    },

                  )
                }
              },
              err => { Swal.fire('', err.message, 'error') }

            )
          }
        }, err => { console.log(err); }
      )
    }
    debugger
  }
  back() {
    this.location.back();
  }


}