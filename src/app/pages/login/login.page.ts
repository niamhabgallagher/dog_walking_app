import { LoadingService } from './../../services/loading/loading.service';
import { Storage } from '@ionic/storage';
import { User } from './../../model/User';
import { InfoService } from './../../services/info/info.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private userServ: UserService,
    private infoServ: InfoService,
    private storage: Storage,
    private loadingServ: LoadingService
  ) { }

  ngOnInit() {
    this.resetLogin();
  }

  goToRegister() {
    console.log('nav to register');
    this.navCtrl.navigateForward('/tabs/viewuser/register');
  }

  onLogin() {
    console.log('try to log in');
    this.loadingServ.presentLoading();
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then((res: any) => {
      this.userServ.getUsers().subscribe(async (users: User[]) => {
        if(users.length > 0) {
          console.log('users', users);
          this.infoServ.user = users[0];
          this.storage.set('user_info', users[0]);
          console.log('success', res);
          this.navCtrl.pop();
          this.loadingServ.dismissLoading();
          const toast = this.toastCtrl.create({
            message: 'You are logged in',
            duration: 2000,
            color: 'success'
          });
    
          (await toast).present();
          this.resetLogin();
        } else {
          console.log('ERROR NO USERS', users);
          this.loadingServ.dismissLoading();
          const toast = this.toastCtrl.create({
            message: 'Error logging in',
            duration: 2000,
            color: 'danger'
          });
    
          (await toast).present();
        }
      });
    })
    .catch(async (error) => {
      this.loadingServ.dismissLoading();
      if (error.message) {
        const toast = this.toastCtrl.create({
          message: error.message,
          duration: 2000,
          color: 'danger'
        });
  
        (await toast).present();
      } else {
        console.error('error', error);
      }
    });
  }

  resetLogin() {
    this.email = '';
    this.password = '';
  }
}
