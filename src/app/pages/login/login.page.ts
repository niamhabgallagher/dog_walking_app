import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

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
    private fireAuth: FirebaseAuthentication
  ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  goToRegister() {
    console.log('nav to register');
    this.navCtrl.navigateForward('/tabs/viewuser/register');
  }

  onLogin() {
    this.fireAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(async (res: any) => {
        console.log('success', res)
        this.email = '';
        this.password = '';
        this.navCtrl.pop();
        const toast = this.toastCtrl.create({
          message: 'You are logged in',
          duration: 2000
        });

        (await toast).present();
      })
      .catch((error: any) => console.error(error));
  }
}
