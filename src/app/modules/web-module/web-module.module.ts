import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebModuleRoutingModule } from './web-module-routing.module';
import { OnePageComponent } from './one-page/one-page.component';


@NgModule({
  declarations: [
  
    OnePageComponent
  ],
  imports: [
    CommonModule,
    WebModuleRoutingModule
  ]
})
export class WebModuleModule { }
