import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: boolean = false;

  constructor(
    public loadingController: LoadingController
  ) { }

  async presentLoading() {
    if(this.loading == false) {
      const loading = await this.loadingController.create({
        message: 'loading...'
      });
      await loading.present().then(() => this.loading = true);
  
      console.log('present loading!');
    }
  }

  dismissLoading() {
    this.loadingController.dismiss().then(() => this.loading = false);
    console.log('loading dismissed');
  }


}

