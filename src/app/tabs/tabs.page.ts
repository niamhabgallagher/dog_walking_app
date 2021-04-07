import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.get('user').then((user) => {
      if(!user || user == null || user == undefined) {
        this.storage.set('user', null);
      } else {
        // TODO:
        // get user auth key from firebase
        // keep them logged in and get all data
      }
    });
  }

}
