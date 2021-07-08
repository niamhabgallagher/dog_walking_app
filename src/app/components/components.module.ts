import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  declarations: [
    NavbarComponent,
    GoogleMapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],  
  exports: [
    NavbarComponent,
    GoogleMapComponent
  ]
})
export class ComponentsModule { }
