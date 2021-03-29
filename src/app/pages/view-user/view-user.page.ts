import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log('login nav');
    this.navCtrl.navigateForward('/tabs/viewuser/login');
  }

  register() {
    console.log('register nav');
    this.navCtrl.navigateForward('/tabs/viewuser/register');
  }
}
