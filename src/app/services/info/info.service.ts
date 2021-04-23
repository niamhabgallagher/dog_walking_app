import { User } from './../../model/User';
import { DogInfo } from './../../model/DogInfo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  public dogInfo: DogInfo;
  public user: User;

  constructor() { }
}
