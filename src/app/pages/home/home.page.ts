import { User } from './../../model/User';
import { DogService } from './../../services/dog/dog.service';
import { WalkService } from './../../services/walk/walk.service';
import { ToiletTally } from './../../model/ToiletTally';
import { Route } from '../../model/Route';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, NavController, PickerController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PickerOptions } from "@ionic/core";

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  startTime = 0;
  peeTally = 0;
  pooTally = 0;
  walkNotes = '';
  dogsPresent = [];
  allDogs = [];
  user: User;

  positionSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private geolocation: Geolocation,
    private storage: Storage,
    private alertCtrl: AlertController,
    private pickerCtrl: PickerController,
    private walkServ: WalkService,
    private dogServ: DogService
  ) {
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();

      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

  ionViewWillEnter(){
   this.loadHistoricRoutes();
  }

  loadHistoricRoutes() {
    this.storage.get('user_info').then((user) => {
      this.user = user;
      if(user) {
        this.walkServ.getWalks().subscribe((walks) => {
          this.previousTracks = walks;
        });
        this.dogServ.getDogs().subscribe((dogs) => {
          this.allDogs = dogs;
        })
      } else {
        this.storage.get('routes').then(data => {
          if (data) {
            this.previousTracks = data;
          }
        });
        this.storage.get('dogList').then((dogs) => {
          if(dogs) {
            this.allDogs = dogs;
          }
        });
      }
    });
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
    this.peeTally = 0;
    this.pooTally = 0;
    this.walkNotes = '';
    this.startTime = new Date().getTime();
    this.dogsPresent = [];

    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p: Geoposition) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#243a2a',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  async stopTracking() {
    const alert = this.alertCtrl.create({
      header: 'End Walk?',
      message: 'Are you sure you want to end your walk?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let tletTally: ToiletTally = { pee: this.peeTally, poo: this.pooTally };
            let newRoute: Route = { 
              start: this.startTime,
              finished: new Date().getTime(),
              path: this.trackedRoute,
              toiletTally: tletTally,
              walkNotes: this.walkNotes,
              dogs: this.dogsPresent 
            };
            console.log('Confirm', newRoute);
            if(this.user) {
              this.walkServ.addWalk(newRoute).then(() => {
                this.isTracking = false;
                this.positionSubscription.unsubscribe();
                this.currentMapTrack.setMap(null);
              }).catch((error) => {
                console.error('error', error);
              });
            } else {
              this.previousTracks.push(newRoute);
              this.storage.set('routes', this.previousTracks);
              this.isTracking = false;
              this.positionSubscription.unsubscribe();
              this.currentMapTrack.setMap(null);
            }
          }
        }
      ]
    });

    (await alert).present();
  }
  
  showHistoryRoute(route) {
    this.redrawPath(route);
  }

  async addToilet() {
    const alert = this.alertCtrl.create({
      header: 'Did your dog go to the toilet?',
      inputs: [
        {
          name: 'pee',
          type: 'checkbox',
          label: 'Pee',
          value: 'pee'
        },
        {
          name: 'poo',
          type: 'checkbox',
          label: 'Poo',
          value: 'poo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: (info) => {
            console.log('Confirm', info);
            for (const i of info) {
              if(i == 'pee'){
                this.peeTally++;
              } else if(i == 'poo'){
                this.pooTally++;
              }
            }
          }
        }
      ]
    });

    (await alert).present();
  }

  async addDog() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text:'Add Dog',
          handler:(value:any) => {
            console.log(value);
            this.dogsPresent.push(value.dogs.value);
          }
        }
      ],
      columns:[{
        name:'dogs',
        options:this.getColumnOptions()
      }]
    };

    let picker = await this.pickerCtrl.create(options);
    picker.present()
  }

  getColumnOptions(){
    let options = [];
    this.allDogs.forEach(x => {
      options.push({text:x.name,value:x.id});
    });
    return options;
  }

  async addNotes() {
    const alert = this.alertCtrl.create({
      header: 'Add Notes',
      inputs: [
        {
          name: 'notes',
          type: 'textarea',
          placeholder: 'Enter your walk notes here',
          value: this.walkNotes
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: (info) => {
            console.log('Confirm', info);
            this.walkNotes = info.notes;
          }
        }
      ]
    });

    (await alert).present();
  }
}
