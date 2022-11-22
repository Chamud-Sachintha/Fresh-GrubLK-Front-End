import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCartsComponent } from './customer/all-carts/all-carts.component';
import { ExploreRestuarantComponent } from './customer/explore-restuarant/explore-restuarant.component';
import { FoodOrderComponent } from './customer/food-order/food-order.component';
import { HomeComponent } from './customer/home/home.component';
import { HomeComponent as DriverHomeComponent } from './driver/home/home.component';
import { ManageCartComponent } from './customer/manage-cart/manage-cart.component';
import { OrdersComponent } from './customer/orders/orders.component';
import { ProfileSetingsComponent } from './customer/profile-setings/profile-setings.component';
import { SetLocationComponent } from './customer/set-location/set-location.component';
import { ViewOrderComponent } from './customer/view-order/view-order.component';
import { AddCategoryComponent } from './seller/add-category/add-category.component';
import { AddEatablesComponent } from './seller/add-eatables/add-eatables.component';
import { AddRestuaratComponent } from './seller/add-restuarat/add-restuarat.component';
import { HomeComponent as SellerHome } from './seller/home/home.component';
import { ManageEatablesComponent } from './seller/manage-eatables/manage-eatables.component';
import { ManageOrderComponent } from './seller/manage-order/manage-order.component';
import { ManageRestuarantsComponent } from './seller/manage-restuarants/manage-restuarants.component';
import { OrderRequestsComponent } from './seller/order-requests/order-requests.component';
import { SellerProfileSetingsComponent } from './seller/seller-profile-setings/seller-profile-setings.component';
import { UpdateCategoriesComponent } from './seller/update-categories/update-categories.component';
import { UpdateEatableComponent } from './seller/update-eatable/update-eatable.component';
import { UpdateRestuarantComponent } from './seller/update-restuarant/update-restuarant.component';
import { DriverProfileSettingsComponent } from './driver/driver-profile-settings/driver-profile-settings.component';
import { AvailableDeliveriesComponent } from './driver/available-deliveries/available-deliveries.component';

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
        path: 'customer/cart',
        component: AllCartsComponent
      },
      {
        path: 'customer/view-cart/:id',
        component: ManageCartComponent
      },
      {
        path: 'customer/orders',
        component: OrdersComponent
      },
      {
        path: 'customer/view-order/:id',
        component: ViewOrderComponent
      },
      {
        path: 'customer/profile',
        component: ProfileSetingsComponent
      },
      
      /* 
        seller routings define here......
      */
     
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
        path: 'seller/update-restuarant/:id',
        component: UpdateRestuarantComponent
      },
      {
        path: 'seller/add-category',
        component: AddCategoryComponent
      },
      {
        path: 'seller/update-category/:id',
        component: UpdateCategoriesComponent
      },
      {
        path: 'seller/add-eatables',
        component: AddEatablesComponent
      },
      {
        path: 'seller/manage-eatables',
        component: ManageEatablesComponent
      },
      {
        path: 'seller/update-eatable/:id',
        component: UpdateEatableComponent
      },
      {
        path: 'seller/order-requests',
        component: OrderRequestsComponent
      },
      {
        path: 'seller/manage-order',
        component: ManageOrderComponent
      },
      {
        path: 'seller/profile',
        component: SellerProfileSetingsComponent
      },

      /* driver routing paths */
      {
        path: 'driver',
        component: DriverHomeComponent
      },
      {
        path: 'driver/available-deliveries',
        component: AvailableDeliveriesComponent
      },
      {
        path: 'driver/profile',
        component: DriverProfileSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
