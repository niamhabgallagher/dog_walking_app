import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalkListPage } from './walk-list.page';

const routes: Routes = [
  {
    path: '',
    component: WalkListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalkListPageRoutingModule {}
