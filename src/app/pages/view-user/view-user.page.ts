import { DogService } from './../../services/dog/dog.service';
import { User } from './../../model/User';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

  userInfo: User;
  numOfDogs: Number;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private dogServ: DogService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.updateUserInfo();
  }

  login() {
    console.log('login nav');
    this.navCtrl.navigateForward('/tabs/viewuser/login');
  }

  register() {
    console.log('register nav');
    this.navCtrl.navigateForward('/tabs/viewuser/register');
  }

  logout() {
    this.afAuth.signOut().then(async (res) => {
      console.log('logged out', res);
      await this.storage.set('user_info', undefined);
      await this.storage.set('token', undefined);
      this.updateUserInfo();
    }).catch((error) => {
      console.error('error', error);
    });
  }

  updateUserInfo() {
    this.storage.get('user_info').then((user) => {
      if(user) {
        this.userInfo = user;
        this.dogServ.getDogs().subscribe((dogs) => {
          this.numOfDogs = dogs.length;
        });
        console.log('user', this.userInfo);
        console.log('numOfDogs', this.numOfDogs);
      } else {
        this.userInfo = undefined;
      }
    });
  }
}
