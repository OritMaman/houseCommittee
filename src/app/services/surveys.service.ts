import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Surveys } from '../classes/surveys';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(public http:HttpClient) { }
  survey:Surveys = new Surveys();
  surveysToEnter:Surveys = new Surveys();
  radioB:number;
  radioB1: number = 0;
  radioB2: number = 0;
  isShow:boolean=false;
  numOp:number = 0;
  Re:boolean=false;
  listS:Array<Surveys>=new Array<Surveys>()
url="https://localhost:44339/api/Surveys/"

addSurvey(s:Surveys):Observable<Surveys>
{
  return this.http.post<Surveys>(this.url+"addSurvey",s)
}
GetAllById(id:number):Observable<Array<Surveys>>
{
  return this.http.get<Array<Surveys>>(this.url+"GetAllById/"+id)
}
DeleteSurvey(surveyId:number, buildingId:number):Observable<Array<Surveys>>
{
  return this.http.delete<Array<Surveys>>(this.url+"DeleteSurvey/"+surveyId+"/"+buildingId)
}
EditSurvey(s:Surveys):Observable<Surveys>
{
  debugger
  return this.http.put<Surveys>(this.url+"EditSurvey",s)
}
SendSurvey(survey:Surveys):Observable<boolean>
{
  return this.http.post<boolean>(this.url+"SendSurvey",survey)
}

}