import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebLayoutComponent } from './layouts/web-layout/web-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { WebHeaderComponent } from './shared/web-header/web-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerDashboardHeaderComponent } from './shared/customer-dashboard-header/customer-dashboard-header.component';

@NgModule({
  declarations: [
    AppComponent,
    WebLayoutComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    WebHeaderComponent,
    CustomerDashboardHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
