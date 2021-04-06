import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

}
