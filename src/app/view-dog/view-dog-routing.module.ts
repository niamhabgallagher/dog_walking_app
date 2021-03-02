import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDogPage } from './view-dog.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDogPageRoutingModule {}
