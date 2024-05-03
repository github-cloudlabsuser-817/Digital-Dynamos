import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { DashboardPageModule } from './dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  // {  
  //   path: 'dashboard',  
  //   loadChildren: () => DashboardPageModule,
  //   canActivate: [MsalGuard]
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'add-topic',
    loadChildren: () => import('./add-topic/add-topic.module').then( m => m.AddTopicPageModule)
  },
  {
    path: 'topic-info',
    loadChildren: () => import('./topic-info/topic-info.module').then( m => m.TopicInfoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules, 
      onSameUrlNavigation: 'reload', 
      paramsInheritanceStrategy: 'emptyOnly',
      canceledNavigationResolution: 'replace',
      urlUpdateStrategy: 'deferred' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
