import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalkInfoPage } from './walk-info.page';

const routes: Routes = [
  {
    path: '',
    component: WalkInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalkInfoPageRoutingModule {}
