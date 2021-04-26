import { User } from './../../model/User';
import { InfoService } from './../../services/info/info.service';
import { DogService } from './../../services/dog/dog.service';
import { LoadingService } from './../../services/loading/loading.service';
import { Storage } from '@ionic/storage';
import { DogInfo } from './../../model/DogInfo';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

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
    private toastCtrl: ToastController,
    private loadingServ: LoadingService,
    private dogServ: DogService,
    public infoServ: InfoService
  ) { }

  ngOnInit() {
    this.resetDogInfo();
    this.http.get('./assets/dog-breeds.json').subscribe((breeds: any) => {
      this.dogBreeds = breeds.breeds;
    });
    if(this.infoServ.edit = true) {
      this.dogInfo = this.infoServ.editDog;
    }
  }

  addDog() {
    this.loadingServ.presentLoading();
    this.http.get('https://dog.ceo/api/breeds/image/random').subscribe((res: any) => {
    this.dogInfo.image = res.message;
    this.storage.get('user_info').then((user) => {
      if(user) {
        this.dogServ.addDog(this.dogInfo).then(async (res) => {
          console.log('added', res);
          this.dogServ.getDogs().subscribe((dogs) => this.allDogs = dogs);
          console.log('uploaded dog', this.allDogs);
          this.navCtrl.pop();
          this.resetDogInfo();
          this.loadingServ.dismissLoading();
          const toast = this.toastCtrl.create({
            message: this.dogInfo.name + ' has been added!',
            position: 'bottom',
            duration: 2000,
            color: 'success'
          });
          (await toast).present();
        }).catch((error) => console.error('error', error));
      } else {
        this.storage.get('dogList').then((dogs) => {
          if(dogs) {
            this.allDogs = dogs;
          }
            this.dogInfo.id = this.allDogs.length;
            this.allDogs.push(this.dogInfo);
            this.storage.set('dogList', this.allDogs).then(async () => {
              console.log('uploaded dog', this.allDogs);
              this.navCtrl.pop();
              this.resetDogInfo();
              this.loadingServ.dismissLoading();
              const toast = this.toastCtrl.create({
                message: this.dogInfo.name + ' has been added!',
                position: 'bottom',
                duration: 2000,
                color: 'success'
              });
              (await toast).present();
            });
          });
        }
      });
    });
  }

  editDog() {
    this.storage.get('user_info').then((user) => {
      if(user) {
        this.dogServ.updateDog(this.dogInfo, this.dogInfo.id).then(() => {
          this.infoServ.dogInfo = this.dogInfo;
          this.resetDogInfo();
          this.resetEdit();
          this.navCtrl.pop();
        });
      } else {
        this.allDogs[this.infoServ.editDogInt] = this.dogInfo;
        this.infoServ.dogInfo = this.dogInfo;
        this.resetDogInfo();
        this.resetEdit();
        this.navCtrl.pop();
      }
    });
  }

  resetDogInfo() {
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
  }

  resetEdit() {
    this.infoServ.edit = false;
    this.infoServ.editDog = undefined;
    this.infoServ.editDogInt = undefined;
  }

}
