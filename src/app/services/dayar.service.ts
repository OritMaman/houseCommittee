import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dayar } from '../classes/dayar';

@Injectable({
  providedIn: 'root'
})
export class DayarService {

  constructor(public http:HttpClient) { }
dayar:Dayar = new Dayar();
select:boolean=true;
isShow:boolean=false;
listD:Array<Dayar>=new Array<Dayar>()
url="https://localhost:44339/api/Dayar/"
addDayar(d:Dayar):Observable<Dayar>
{
  return this.http.post<Dayar>(this.url+"addDayar",d)
}
addDayarim(numFlats:number,dayar:Dayar):Observable<boolean>
{
  return this.http.post<boolean>(this.url+"addDayarim/"+numFlats,dayar)
}

GetAll():Observable<Array<Dayar>>
{
  return this.http.get<Array<Dayar>>(this.url+"GetAll")
}
getByMailAndPass(m:string,p:string):Observable<Dayar>
{
  return this.http.get<Dayar>(this.url+"Enter/"+m+"/"+p)
}
GetAllById(id:number):Observable<Array<Dayar>>
{
  return this.http.get<Array<Dayar>>(this.url+"GetAllById/"+id)
}
EditDayar(dayar:Dayar):Observable<Array<Dayar>>
{
  debugger
  return this.http.put<Array<Dayar>>(this.url+"EditDayar",dayar)
}
IfMailExsist(mail:string):Observable<Dayar>
{debugger
  return this.http.post<Dayar>(this.url+"IfMailExsist",mail)
}
SortByName(search:string,buildingId:number):Observable<Array<Dayar>>
{
  return this.http.get<Array<Dayar>>(this.url+"SortByName/"+search+"/"+buildingId)
}
editPassword(dayarId:number,pass:string):Observable<Dayar>
{debugger
  return this.http.get<Dayar>(this.url+"editPassword/"+dayarId+"/"+pass)
}
isValidMail(mail:string):Observable<boolean>
{debugger
  return this.http.get<boolean>(this.url+"IsValidEmail/"+mail)
}
}

   

