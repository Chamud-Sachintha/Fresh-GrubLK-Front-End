import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './customer/home/home.component';
import { HomeComponent as SellerHome } from './seller/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full'
  },
  
  {
    path: '',
    children: [
      {
        path: 'customer',
        component: HomeComponent
      },

      {
        path: 'seller',
        component: SellerHome
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
