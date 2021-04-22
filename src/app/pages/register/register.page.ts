import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { User } from './../../model/User';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register: User = {
    forename: '',
    surname: '',
    email: '',
    password: '',
  };

  constructor(
    private navCtrl: NavController,
    private fireAuth: FirebaseAuthentication
  ) { }

  ngOnInit() {
    this.resetRegister();
  }

  onLogin() {
    this.navCtrl.navigateForward('/tabs/viewuser/login');
  }

  onRegister() {
    this.fireAuth.createUserWithEmailAndPassword(this.register.email, this.register.password)
      .then((res: any) => {
        console.log('success', res);
        this.navCtrl.pop()
      })
      .catch((error: any) => {
        console.error('error', error);
      });
  }

  resetRegister() {
    this.register = {
      forename: '',
      surname: '',
      email: '',
      password: '',
    };
  }
}
