import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dayar } from '../classes/dayar';
import { Payment } from '../classes/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http:HttpClient) { }
  payment:Payment
  radioB1:boolean=true;
url="https://localhost:44339/api/Payment/"
//url="https://localhost:7201/api/Payment/"

GetAll():Observable<Array<Payment>>
{
  debugger
  return this.http.get<Array<Payment>>(this.url+"GetAll")
}

GetAllById(id:number):Observable<Array<Payment>>
{
  return this.http.get<Array<Payment>>(this.url+"GetAllById/"+id)
}
// sendMail(mailTo:string):Observable<boolean>
// {debugger
//   return this.http.get<boolean>(this.url+"SendEmail/"+mailTo)
// }
sendMail(mailTo:Array<Dayar>,payFor:string):Observable<boolean>
{debugger
  return this.http.post<boolean>(this.url+"SendEmail"+mailTo,payFor)
}

}