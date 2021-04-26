import { Route } from './../../model/Route';
import { User } from './../../model/User';
import { DogInfo } from './../../model/DogInfo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  public dogInfo: DogInfo;
  public editDog: DogInfo;
  public editDogInt: number;
  public edit = false;
  public user: User;
  public walkInfo: Route;

  constructor() { }
}
