import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    component: MsalRedirectComponent
  },
  {
    path: 'test',
    loadChildren: ()=> import('./feature/feature-routing.module')
      .then(m => m.FeatureRoutingModule),
    canActivate: [MsalGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
