import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTopicPage } from './add-topic.page';

const routes: Routes = [
  {
    path: '',
    component: AddTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTopicPageRoutingModule {}
