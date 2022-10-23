import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeComponent } from './page/employee/employee.component';
import { ProductComponent } from './page/product/product.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SignInComponent } from './page/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    pathMatch : 'full',
    redirectTo: "sign-in"
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    component: EmployeeComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    component: ProductComponent,
  },
  {
    path: '**',
    pathMatch : 'full',
    redirectTo: "sign-in"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
