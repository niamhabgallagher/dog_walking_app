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

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private afAuth: AngularFireAuth
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
        console.log('user', this.userInfo);
      } else {
        this.userInfo = undefined;
      }
    });
  }
}
