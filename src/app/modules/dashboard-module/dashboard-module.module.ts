import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './customer/home/home.component';
import { AddRestuaratComponent } from './seller/add-restuarat/add-restuarat.component';
import { AddCategoryComponent } from './seller/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodOrderComponent } from './customer/food-order/food-order.component';
import { ManageRestuarantsComponent } from './seller/manage-restuarants/manage-restuarants.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddRestuaratComponent,
    AddCategoryComponent,
    FoodOrderComponent,
    ManageRestuarantsComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModuleModule { }
