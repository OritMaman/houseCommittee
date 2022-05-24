import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartDataSets, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { Dayar } from 'src/app/classes/dayar';
import { Deshbord } from 'src/app/classes/deshbord';
import { DayarService } from 'src/app/services/dayar.service';
import { DeshbordService } from 'src/app/services/deshbord.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deshbord',
  templateUrl: './deshbord.component.html',
  styleUrls: ['./deshbord.component.css']
})
export class DeshbordComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  constructor(public deshbordSer: DeshbordService, public dayarSer: DayarService, public r: Router) { }
  deshbord: Deshbord = new Deshbord();
  deshbordToEdit: Deshbord
  hachnasot: number
  isShow: number = 0;
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {

    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  barChartLabels: Label[] = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'סך הכנסות' },

    { data: [], label:   'סך הוצאות'},
  ];


  // barChartData: ChartDataSets[] = [
  //   { data: [],label: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  //    backgroundColor: 'red' },
  // ];
  // barChartType: ChartType = 'bar';
  // barChartData: ChartData = {
  //   labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'הכנסות' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'הוצאות' }
  //   ],
  // };


  // randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData.datasets[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     Math.round(Math.random() * 100),
  //     56,
  //     Math.round(Math.random() * 100),
  //     40];

  //   this.chart?.update();
  // }

  ngOnInit(): void {
    this.getDeshbord();
  }
  getDeshbord() {
    this.deshbordSer.getDeshbord(this.dayarSer.dayar.BuildingId).subscribe(
      data => {
        debugger
        if (data === null)
          Swal.fire('', 'ארעה שגיאה', 'error');
        else {
          this.deshbord = data;
          this.chart.datasets[0].data = [
            0, 0, 0, 0, this.deshbord.Hachnasot, 0, 0, 0, 0, 0, 0];
          this.chart.datasets[1].data = [
            0, 0, 0, 0, this.deshbord.Hotzaot, 0, 0, 0, 0, 0, 0];

          this.chart?.update();
        }
      }, err => { Swal.fire('', err.message, 'error') }
    )
  }
  editHachnasot(deshbord: Deshbord) {
    debugger
    this.deshbordToEdit = deshbord;
    this.isShow = 1;
  }
  editHotzaot(deshbord: Deshbord) {
    debugger
    this.deshbordToEdit = deshbord;
    this.isShow = 2;
  }
  //   onMySave(deshbordToEdit:Deshbord){
  //     debugger
  //     if(deshbordToEdit!=null)
  // {
  //     this.deshbordSer.editHachnasot(this.dayarSer.dayar.BuildingId,deshbordToEdit).subscribe(
  //          d=>{
  //            debugger
  //           this.isShow = 0;
  //           this.getDeshbord();
  //          },err=>{alert(err)}
  //       )
  //     }
  //     else
  //     this.isShow = 0;
  //   }
}
