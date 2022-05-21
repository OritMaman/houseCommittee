import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyResults } from '../classes/surveyResults';
import { Surveys } from '../classes/surveys';

@Injectable({
  providedIn: 'root'
})
export class SurveyResultsService {

  constructor(public http:HttpClient) { }
  surveyResults:SurveyResults
url="https://localhost:44339/api/SurveyResults/"

CheckDayarResult(dayarId:number,survey:Surveys):Observable<boolean>{
  return this.http.post<boolean>(this.url+"CheckDayarResult/"+dayarId,survey)
}

EditResult(surveyResults:SurveyResults):Observable<Array<SurveyResults>>
{debugger
  surveyResults.DayarId=Number( surveyResults.DayarId)
  return this.http.put<Array<SurveyResults>>(this.url+"EditResult",surveyResults)
}
AddResult(surveyResults:SurveyResults):Observable<SurveyResults>
{debugger
  surveyResults.DayarId=Number( surveyResults.DayarId)
  return this.http.post<SurveyResults>(this.url+"AddResult",surveyResults)
}
}