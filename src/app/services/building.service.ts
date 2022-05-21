import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../classes/building';
import { Cities } from '../classes/cities';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(public http: HttpClient) { }
  building: Building = new Building();
  city: Cities = new Cities();;
  buildingAddress: Building = new Building();
  radioB1: boolean = true//שומר את הבחירה של תשלום כללי או לכל אחד נפרד
  sumClali: number
  numFlats: number;
  flatHC: number;
  counter: number = 0;
  url = "https://localhost:44339/api/Building/"
  addBuilding(b: Building): Observable<Building> {
    debugger
    return this.http.post<Building>(this.url + "addBuilding", b)
  }
  getAddress(buildingId: number): Observable<Building> {
    return this.http.get<Building>(this.url + "getAddress/" + buildingId)
  }


}



