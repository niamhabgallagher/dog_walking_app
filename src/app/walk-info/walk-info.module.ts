import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalkInfoPageRoutingModule } from './walk-info-routing.module';

import { WalkInfoPage } from './walk-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalkInfoPageRoutingModule
  ],
  declarations: [WalkInfoPage]
})
export class WalkInfoPageModule {}
