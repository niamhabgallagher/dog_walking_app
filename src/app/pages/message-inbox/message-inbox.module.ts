import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageInboxPageRoutingModule } from './message-inbox-routing.module';

import { MessageInboxPage } from './message-inbox.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageInboxPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MessageInboxPage]
})
export class MessageInboxPageModule {}
