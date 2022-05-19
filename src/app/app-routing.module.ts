import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCommitteeComponent } from './components/newCommittee/newCommittee.component';
import { HomeComponent } from './components/home/home.component';
import { HeadCommitteeComponent } from './components/head-committee/head-committee.component';
import { CreatingBuildingComponent } from './components/creating-building/creating-building.component';
import { DayarComponent } from './components/dayar/dayar.component';
import { DayarDetailsComponent } from './components/dayar-details/dayar-details.component';
import { HomeCommitteeComponent } from './components/home-committee/home-committee.component';
import { ListDayarimComponent } from './components/list-dayarim/list-dayarim.component';
import { DeshbordComponent } from './components/deshbord/deshbord.component';
import { DiscourseDayarimComponent } from './components/discourse-dayarim/discourse-dayarim.component';
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
import { CreatingSurveyComponent } from './components/creating-survey/creating-survey.component';
import { EnterTheSurveyComponent } from './components/enter-the-survey/enter-the-survey.component';
import { ResultsComponent } from './components/results/results.component';
import { AddFaultComponent } from './components/add-fault/add-fault.component';
import { MonthlyPaymentComponent } from './components/monthly-payment/monthly-payment.component';
import { OneTimePaymentComponent } from './components/one-time-payment/one-time-payment.component';
import { HachnasotComponent } from './components/hachnasot/hachnasot.component';
import { HotzaotComponent } from './components/hotzaot/hotzaot.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { SendReminderComponent } from './components/send-reminder/send-reminder.component';
import { ResponseSurveyComponent } from './components/response-survey/response-survey.component';



const routes: Routes = [
  {path:"", component: HomeComponent },
  {path: "newCommittee", component: NewCommitteeComponent},
  {path: "password-change/:id", component: PasswordChangeComponent},
  {path: "send-reminder", component: SendReminderComponent},
  {path: "response-survey", component: ResponseSurveyComponent},
  {path: "enterTheSurvey/:surveyId/:dayarId/:buildingId", component: EnterTheSurveyComponent},

  {path: "head-committee", component: HeadCommitteeComponent,children:[
  {path: "", component: DeshbordComponent}
  ]},
  
  
  {path: "dayar", component: DayarComponent,children:[
  {path: "", component: DeshbordComponent},
  {path: "deshbord", component: DeshbordComponent},
  {path: "discourse-dayarim", component: DiscourseDayarimComponent},
  {path: "list-dayarim", component: ListDayarimComponent},
  {path: "surveys", component: SurveysComponent},
  {path:"payments", component: PaymentsComponent },
  {path:"receipts", component: ReceiptsComponent },
  {path: "expenses", component: ExpensesComponent},
  {path: "documents", component: DocumentsComponent},
  {path: "faults", component: FaultsComponent},
  { path: "AddFault", component: AddFaultComponent } ,
  { path: "bank-transfers", component: BankTransfersComponent },
  {path: "enterTheSurvey/:surveyId/:dayarId/:buildingId", component: EnterTheSurveyComponent}
]
},
  ///{{survey.DayarId}}/{{survey.BuildingId}}
  
  {path: "headCommittee", component: HeadCommitteeComponent,children:[
  {path: "", component: HomeCommitteeComponent},
  {path: "creatingBuilding", component: CreatingBuildingComponent},
  {path: "creatingSurvey", component: CreatingSurveyComponent},
  {path: "enterTheSurvey/:surveyId/:dayarId/:buildingId", component: EnterTheSurveyComponent},
  {path: "results/:surveyId", component: ResultsComponent},
  {path: "dayarDetails", component: DayarDetailsComponent},
  {path: "bankAccount", component: BankAccountComponent},
  {path: "hachnasot", component: HachnasotComponent},
  {path: "hotzaot", component: HotzaotComponent},
  
 
  {path: "deshbord", component: DeshbordComponent},
  {path: "discourse-dayarim", component: DiscourseDayarimComponent},
  {path: "list-dayarim", component: ListDayarimComponent},
  {path: "surveys", component: SurveysComponent},
  {path: "committee-payments", component: CommitteePaymentsComponent},
  {path: "special-payments", component: SpecialPaymentsComponent},
  {path: "expenses", component: ExpensesComponent},
  {path: "suppliers", component: SuppliersComponent},
  {path: "bank-transfers", component: BankTransfersComponent},
  {path: "documents", component: DocumentsComponent},
  {path: "faults", component: FaultsComponent},
  { path: "AddFault", component: AddFaultComponent }, 
  {path: "messages", component: MessagesComponent},
  {path: "monthlyPayment", component: MonthlyPaymentComponent},
  {path: "one-timePayment", component: OneTimePaymentComponent}
  ]}
];

 
 // {path:"edit-dayar", component:EditDayarComponent }
 



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
