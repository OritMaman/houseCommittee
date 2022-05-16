import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewCommitteeComponent } from './components/newCommittee/newCommittee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeadCommitteeComponent } from './components/head-committee/head-committee.component';
import { CreatingBuildingComponent } from './components/creating-building/creating-building.component';
import { DayarComponent } from './components/dayar/dayar.component';
import { DayarDetailsComponent } from './components/dayar-details/dayar-details.component';
import { HomeCommitteeComponent } from './components/home-committee/home-committee.component';
import { ListDayarimComponent } from './components/list-dayarim/list-dayarim.component';
import { DiscourseDayarimComponent } from './components/discourse-dayarim/discourse-dayarim.component';
import { DeshbordComponent } from './components/deshbord/deshbord.component';
import { SurveysComponent } from './components/surveys/surveys.component';
import { CommitteePaymentsComponent } from './components/committee-payments/committee-payments.component';
import { SpecialPaymentsComponent } from './components/special-payments/special-payments.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { BankTransfersComponent } from './components/bank-transfers/bank-transfers.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { FaultsComponent } from './components/faults/faults.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ReceiptsComponent } from './components/receipts/receipts.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { EditDayarComponent } from './components/edit-dayar/edit-dayar.component';
import { CreatingSurveyComponent } from './components/creating-survey/creating-survey.component';
import { EnterTheSurveyComponent } from './components/enter-the-survey/enter-the-survey.component';
import { ResultsComponent } from './components/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { AddFaultComponent } from './components/add-fault/add-fault.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MonthlyPaymentComponent } from './components/monthly-payment/monthly-payment.component';
import { OneTimePaymentComponent } from './components/one-time-payment/one-time-payment.component';
import {MatSelectModule} from '@angular/material/select';
import { HachnasotComponent } from './components/hachnasot/hachnasot.component';
import { HotzaotComponent } from './components/hotzaot/hotzaot.component';
import { SendReminderComponent } from './components/send-reminder/send-reminder.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { ResponseSurveyComponent } from './components/response-survey/response-survey.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { JwPaginationModule } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NewCommitteeComponent,
    HomeComponent,
    HeadCommitteeComponent,
    CreatingBuildingComponent,
    DayarComponent,
    DayarDetailsComponent,
    HomeCommitteeComponent,
    ListDayarimComponent,
    DiscourseDayarimComponent,
    DeshbordComponent,
    SurveysComponent,
    CommitteePaymentsComponent,
    SpecialPaymentsComponent,
    ExpensesComponent,
    SuppliersComponent,
    BankTransfersComponent,
    DocumentsComponent,
    FaultsComponent,
    MessagesComponent,
    PaymentsComponent,
    ReceiptsComponent,
    BankAccountComponent,
    EditDayarComponent,
    CreatingSurveyComponent,
    EnterTheSurveyComponent,
    ResultsComponent,
    AddFaultComponent,
    MonthlyPaymentComponent,
    OneTimePaymentComponent,
    HachnasotComponent,
    HotzaotComponent,
    SendReminderComponent,
    PasswordChangeComponent,
    ResponseSurveyComponent
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
   HttpClientModule,
   MatInputModule, 
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    //JwPaginationModule,
    
    MatDatepickerModule,       
    MatNativeDateModule,
    MatSelectModule
    // Ng2SearchPipeModule        
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
