import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpService } from '../services/http-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgxApexchartsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [DashboardPage],
  providers: [DatePipe, HttpService]
})
export class DashboardPageModule {}
