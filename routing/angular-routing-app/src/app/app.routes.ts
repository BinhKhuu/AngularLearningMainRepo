import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: ()=> import('./home/home.component')
            .then( m => m.HomeComponent),
        canActivate: [MsalGuard]
    },
    {
        path: 'auth-redirect',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LoginComponent
    }
];
