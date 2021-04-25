import { WalkService } from './../../services/walk/walk.service';
import { Route } from './../../model/Route';
import { DogService } from './../../services/dog/dog.service';
import { LoadingService } from './../../services/loading/loading.service';
import { UserService } from './../../services/user/user.service';
import { User } from './../../model/User';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { DogInfo } from 'src/app/model/DogInfo';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register: User;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private userServ: UserService,
    private afAuth: AngularFireAuth,
    private loadingServ: LoadingService,
    private dogServ: DogService,
    private walkServ: WalkService
  ) { }

  ngOnInit() {
    this.resetRegister();
  }

  onLogin() {
    this.navCtrl.navigateForward('/tabs/viewuser/login');
  }

  async onRegister() {
    if(this.register.password == this.register.confirmPass) {
      this.loadingServ.presentLoading();
      this.afAuth.createUserWithEmailAndPassword(this.register.email, this.register.password).then(async (res) => {
        console.log('success', res);
        await this.afAuth.idToken.subscribe((token) => this.register.token = token);
        this.register.password = '';
        this.register.confirmPass = '';
        console.log('user', this.register);
        this.userServ.addUser(this.register).then(async (res) => {
          await this.uploadPastDogs();
          await this.uploadWalks();
          console.log("Successfully added document ", res);
          this.storage.set('user_info', this.register);
          this.storage.set('token', this.register.token);
          console.log('SUCCESS user', this.register);
          this.loadingServ.dismissLoading();
          this.navCtrl.pop();
          this.resetRegister();
          const toast = this.toastCtrl.create({
            message: 'Signed up successfully',
            duration: 2000,
            color: 'primary'
          });
    
          (await toast).present();
        }).catch((error) => {
          console.error('error', error);
          this.loadingServ.dismissLoading();
        });
      }).catch(async (error) => {
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
  }

  resetRegister() {
    this.register = {
      forename: '',
      surname: '',
      email: '',
      password: '',
      confirmPass: ''
    };
  }

  uploadPastDogs() {
    console.log('upload dogs');
    return new Promise<void>((resolve, reject) => {
      this.storage.get('dogList').then((dogList: DogInfo[]) => {
        if(dogList) {
          for (const dog of dogList) {
            this.dogServ.addDog(dog);
          }
          resolve();
        } else {
          resolve();
        }
      });
    });
  }

  uploadWalks() {
    console.log('upload walks');
    return new Promise<void>((resolve, reject) => {
      this.storage.get('routes').then((routes: Route[]) => {
        if(routes) {
          for (const route of routes) {
            this.walkServ.addWalk(route);
          }
          resolve();
        } else {
          resolve();
        }
      });
    });
  }
}
