import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
    path:'',
    loadChildren: () => import('./auth-module/auth-module.module').then( m => m.AuthModuleModule)
    },
    {
    path:'main',
    canLoad: [AuthGuard],
    loadChildren: () => import('./main-module/main-module.module').then( m => m.MainModuleModule)
    },
    {
        path:'**',redirectTo:'',pathMatch:'full'
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
