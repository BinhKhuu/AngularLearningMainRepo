import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';


export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then( m=> m.HomeComponent),
        canActivate: [MsalGuard]
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    }
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
];
