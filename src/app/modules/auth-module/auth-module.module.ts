import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class AuthModuleModule { }
