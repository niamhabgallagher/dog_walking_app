import { Storage } from '@ionic/storage';
import { DogInfo } from './../../model/DogInfo';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.page.html',
  styleUrls: ['./add-dog.page.scss'],
})
export class AddDogPage implements OnInit {

  dogBreeds = [];
  allDogs = [];
  dogInfo: DogInfo;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.dogInfo = {
      id: null,
      name: '',
      dob: '',
      weight: { num: null, metric: ''},
      breed: '',
      favFood: '',
      notes: '',
      image: ''
    }
    this.http.get('./assets/dog-breeds.json').subscribe((breeds: any) => {
      this.dogBreeds = breeds.breeds;
    });
  }

  addDog() {
    this.storage.get('dogList').then((dogs) => {
      if(dogs) {
        this.allDogs = dogs;
      }
      this.http.get('https://dog.ceo/api/breeds/image/random').subscribe((res: any) => {
        this.dogInfo.image = res.message
        this.dogInfo.id = this.allDogs.length;
        this.allDogs.push(this.dogInfo);
        this.storage.set('dogList', this.allDogs).then(async () => {
          console.log('uploaded dog', this.allDogs);
          this.navCtrl.pop();
          const toast = this.toastCtrl.create({
            message: this.dogInfo.name + ' has been added!',
            position: 'bottom',
            duration: 2000,
            color: 'success'
          });
          (await toast).present();
        });
      })
    });
  }

}
