import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageInboxPage } from './message-inbox.page';

const routes: Routes = [
  {
    path: '',
    component: MessageInboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageInboxPageRoutingModule {}
