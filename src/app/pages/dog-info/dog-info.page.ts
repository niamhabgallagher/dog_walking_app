import { DogInfo } from './../../model/DogInfo';
import { InfoService } from './../../services/info/info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dog-info',
  templateUrl: './dog-info.page.html',
  styleUrls: ['./dog-info.page.scss'],
})
export class DogInfoPage implements OnInit {

  dog: DogInfo;

  constructor(
    private info: InfoService
  ) { }

  ngOnInit() {
    this.dog = this.info.dogInfo;
  }

}
