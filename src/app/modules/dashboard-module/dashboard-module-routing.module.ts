import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreRestuarantComponent } from './customer/explore-restuarant/explore-restuarant.component';
import { FoodOrderComponent } from './customer/food-order/food-order.component';
import { HomeComponent } from './customer/home/home.component';
import { AddCategoryComponent } from './seller/add-category/add-category.component';
import { AddRestuaratComponent } from './seller/add-restuarat/add-restuarat.component';
import { HomeComponent as SellerHome } from './seller/home/home.component';
import { ManageRestuarantsComponent } from './seller/manage-restuarants/manage-restuarants.component';

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
        path: 'customer/buy',
        component: FoodOrderComponent
      },
      {
        path: 'customer/buy/:id',
        component: ExploreRestuarantComponent
      },
      
      {
        path: 'seller',
        component: SellerHome
      },
      {
        path: 'seller/add-restuarant',
        component: AddRestuaratComponent
      },
      {
        path: 'seller/manage-restuarants',
        component: ManageRestuarantsComponent
      },
      {
        path: 'seller/add-category',
        component: AddCategoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
