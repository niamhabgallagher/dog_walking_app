import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalksPageRoutingModule } from './walks-routing.module';

import { WalksPage } from './walks.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalksPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WalksPage]
})
export class WalksPageModule {}
