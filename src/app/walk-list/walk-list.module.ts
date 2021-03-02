import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalkListPageRoutingModule } from './walk-list-routing.module';

import { WalkListPage } from './walk-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalkListPageRoutingModule
  ],
  declarations: [WalkListPage]
})
export class WalkListPageModule {}
