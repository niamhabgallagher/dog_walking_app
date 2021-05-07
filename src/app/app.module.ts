import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment'
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '_doggi-walks',
      driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage']
    }),
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicSelectableModule
  ],
  providers: [
    SplashScreen,
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    FirebaseAuthentication,
    FirebaseX
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
