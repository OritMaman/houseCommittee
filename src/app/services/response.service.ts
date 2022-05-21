import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dayar } from '../classes/dayar';
import { Responses } from '../classes/responses';
import { Surveys } from '../classes/surveys';


@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(public http:HttpClient) { }

  response : Responses = new Responses()
  listResponses :Array<Responses>=new Array<Responses>()
url="https://localhost:44339/api/Responses/"

AddRespose(r:Responses):Observable<Responses>
{debugger
  r.DayarId=Number( r.DayarId)
  r.SurveyId=Number( r.SurveyId)
  return this.http.post<Responses>(this.url+"AddResponse",r)
}
getAllResponses(buildingId:number):Observable<Array<Responses>>
{
  return this.http.get<Array<Responses>>(this.url+"GetAllResponses/"+buildingId)
}
EditResponse(response:Responses):Observable<Array<Responses>>
{debugger
  response.DayarId=Number(response.DayarId)
  response.SurveyId=Number(response.SurveyId)
  return this.http.put<Array<Responses>>(this.url+"EditResponse",response)
}
CheckDayarRespose(dayarId:number, survey:Surveys):Observable<boolean>
{debugger
  return this.http.post<boolean>(this.url+"CheckDayarRespose/"+dayarId,survey)
  
}


}