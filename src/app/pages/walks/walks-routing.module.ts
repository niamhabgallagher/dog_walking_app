import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalksPage } from './walks.page';

const routes: Routes = [
  {
    path: '',
    component: WalksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalksPageRoutingModule {}
