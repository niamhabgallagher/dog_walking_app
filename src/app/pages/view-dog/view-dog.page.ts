import { InfoService } from './../../services/info/info.service';
import { DogInfo } from './../../model/DogInfo';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-view-dog',
  templateUrl: './view-dog.page.html',
  styleUrls: ['./view-dog.page.scss'],
})
export class ViewDogPage implements OnInit {

  listOfDogs: DogInfo[];

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private info: InfoService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.storage.get('dogList').then((list : DogInfo[]) => {
     if(list) {
       this.listOfDogs = list;
       for (const dog of this.listOfDogs) {
         dog.age = moment(dog.dob).toNow(true);
       }
     }
   });
  }

  addDog() {
    console.log('go to: add dog pg');
    this.navCtrl.navigateForward('/tabs/viewdog/adddog');
  }

  dogInfo(dog: DogInfo) {
    this.info.dogInfo = dog;
    console.log('go to: view dog pg', this.info.dogInfo);
    this.navCtrl.navigateForward('/tabs/viewdog/doginfo');
  }

  deleteDog(dog: DogInfo, i) {
    console.log(dog, i);
    this.listOfDogs.splice(i, 1);
    console.log(this.listOfDogs);
    this.storage.set('dogList', this.listOfDogs).then(async () => {
      const toast = this.toastCtrl.create({
        message: 'Dog is removed',
        duration: 2000,
        color: 'danger'
      });
      (await toast).present();
    })
  }
}
