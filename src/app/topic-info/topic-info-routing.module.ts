import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicInfoPage } from './topic-info.page';

const routes: Routes = [
  {
    path: '',
    component: TopicInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicInfoPageRoutingModule {}
