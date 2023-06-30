import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchageRoutingModule } from './purchage-routing.module';
import { PurchageComponent } from './purchage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PurchageRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
})
export class PurchageModule {}
