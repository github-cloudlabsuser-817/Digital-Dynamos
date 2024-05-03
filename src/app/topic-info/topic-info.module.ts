import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicInfoPageRoutingModule } from './topic-info-routing.module';

import { TopicInfoPage } from './topic-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicInfoPageRoutingModule
  ],
  declarations: [TopicInfoPage]
})
export class TopicInfoPageModule {}
