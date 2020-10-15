import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guards';
import { LoginGuard } from './shared/guards/login.guards';
import { RegistrarUserComponent } from './registrar-user/registrar-user.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { CompanyGuard } from './shared/guards/company/company.guard';
import { PersonaGuard } from './shared/guards/persona/persona.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule), 
    canActivate: [LoginGuard] 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule), 
    canActivate: [LoginGuard] 
  },
  // { 
  //   path: 'validacion/:email_code/:password_code', 
  //   loadChildren: './validate-email/validate-email.module#ValidateEmailModule' 
  // },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [AuthGuard, PersonaGuard]
  },
  { 
    path: 'company', 
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule), 
    canActivate: [AuthGuard, CompanyGuard]
  },
  { 
    path: 'registerUser', 
    component: RegistrarUserComponent, 
    canActivate: [LoginGuard] 
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
