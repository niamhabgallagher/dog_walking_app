import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogsPageRoutingModule } from './dogs-routing.module';

import { DogsPage } from './dogs.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DogsPage]
})
export class DogsPageModule {}
