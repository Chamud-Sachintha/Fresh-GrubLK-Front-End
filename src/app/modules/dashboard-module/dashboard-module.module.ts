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
import { ProfileSetingsComponent } from './customer/profile-setings/profile-setings.component';
import { SetLocationComponent } from './customer/set-location/set-location.component';
import { ViewOrderComponent } from './customer/view-order/view-order.component';
import { SellerProfileSetingsComponent } from './seller/seller-profile-setings/seller-profile-setings.component';
import { DriverProfileSettingsComponent } from './driver/driver-profile-settings/driver-profile-settings.component';
import { AvailableDeliveriesComponent } from './driver/available-deliveries/available-deliveries.component';
import { ManageDeliveryRequestComponent } from './driver/manage-delivery-request/manage-delivery-request.component';
import { CompletedJobsComponent } from './driver/completed-jobs/completed-jobs.component';
import { RatingDialogComponent } from './customer/rating-dialog/rating-dialog.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageSellersComponent } from './admin/manage-sellers/manage-sellers.component';
import { ManageDriversComponent } from './admin/manage-drivers/manage-drivers.component';


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
    UpdateEatableComponent,
    ProfileSetingsComponent,
    SetLocationComponent,
    ViewOrderComponent,
    SellerProfileSetingsComponent,
    DriverProfileSettingsComponent,
    AvailableDeliveriesComponent,
    ManageDeliveryRequestComponent,
    CompletedJobsComponent,
    RatingDialogComponent,
    ManageCustomersComponent,
    ManageSellersComponent,
    ManageDriversComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule
  ]
})
export class DashboardModuleModule { }
