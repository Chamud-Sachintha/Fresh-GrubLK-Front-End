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
    ManageCartComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModuleModule { }
