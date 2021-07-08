import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    public router: Router
  ) { }

  ngOnInit() {
    console.log(this.router.url);
  }

  async navigateTo(path: string) {
    return await this.navCtrl.navigateForward(path);
  }

}
