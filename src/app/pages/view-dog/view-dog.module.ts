import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDogPageRoutingModule } from './view-dog-routing.module';

import { ViewDogPage } from './view-dog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDogPageRoutingModule
  ],
  declarations: [ViewDogPage]
})
export class ViewDogPageModule {}
