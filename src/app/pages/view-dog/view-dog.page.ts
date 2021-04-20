import { DogInfo } from './../../model/DogInfo';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    private storage: Storage
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
}
