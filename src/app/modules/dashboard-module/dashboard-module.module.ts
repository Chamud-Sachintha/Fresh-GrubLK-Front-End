import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './customer/home/home.component';
import { AddRestuaratComponent } from './seller/add-restuarat/add-restuarat.component';
import { AddCategoryComponent } from './seller/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodOrderComponent } from './customer/food-order/food-order.component';
import { ManageRestuarantsComponent } from './seller/manage-restuarants/manage-restuarants.component';
import { ExploreRestuarantComponent } from './customer/explore-restuarant/explore-restuarant.component';
import { AddEatablesComponent } from './seller/add-eatables/add-eatables.component';
import { ManageEatablesComponent } from './seller/manage-eatables/manage-eatables.component';
import { ManageCartComponent } from './customer/manage-cart/manage-cart.component';
import { OrdersComponent } from './customer/orders/orders.component';
import { OrderRequestsComponent } from './seller/order-requests/order-requests.component';
import { AllCartsComponent } from './customer/all-carts/all-carts.component';
import { ManageOrderComponent } from './seller/manage-order/manage-order.component';
import { UpdateRestuarantComponent } from './seller/update-restuarant/update-restuarant.component';
import { UpdateCategoriesComponent } from './seller/update-categories/update-categories.component';
import { UpdateEatableComponent } from './seller/update-eatable/update-eatable.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddRestuaratComponent,
    AddCategoryComponent,
    FoodOrderComponent,
    ManageRestuarantsComponent,
    ExploreRestuarantComponent,
    AddEatablesComponent,
    ManageEatablesComponent,
    ManageCartComponent,
    OrdersComponent,
    OrderRequestsComponent,
    AllCartsComponent,
    ManageOrderComponent,
    UpdateRestuarantComponent,
    UpdateCategoriesComponent,
    UpdateEatableComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModuleModule { }
