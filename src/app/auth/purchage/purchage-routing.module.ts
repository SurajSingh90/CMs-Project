import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchageComponent } from './purchage.component';

const routes: Routes = [
  {
    path: '',
    component: PurchageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchageRoutingModule {}
