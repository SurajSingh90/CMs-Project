import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchageComponent } from './purchage/purchage.component';
// import { PurchageComponent } from './purchage/purchage.component';

// import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    PurchageComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // BrowserModule,
    // BrowserAnimationsModule,
  ],
})
export class AuthModule {}
