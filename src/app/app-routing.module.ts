import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { FullDashboardComponent } from './layouts/fulldashboard/fulldashboard.component';
import { LayoutwebComponent } from './layouts/layoutweb/layoutweb.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';

const routes: Routes = [
  {path: 'recoverPassword', component: RecoverPasswordComponent},
  {path: 'newPassword', component: NewPasswordComponent},
  {
    path: 'admin',
    component: FullDashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LayoutwebComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./portal-web/portal-web.module').then(m => m.PortalModule)
      }
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
