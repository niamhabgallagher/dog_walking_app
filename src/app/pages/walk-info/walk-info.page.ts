import { DogService } from './../../services/dog/dog.service';
import { InfoService } from './../../services/info/info.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Route } from './../../model/Route';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import { DogInfo } from 'src/app/model/DogInfo';

declare var google;

@Component({
  selector: 'app-walk-info',
  templateUrl: './walk-info.page.html',
  styleUrls: ['./walk-info.page.scss'],
})
export class WalkInfoPage implements OnInit {

  previousTracks : Route[];
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  walk: Route;
  dogs: DogInfo[];

  constructor(
    private plt: Platform,
    private geolocation: Geolocation,
    private infoServ: InfoService,
    private dogServ: DogService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.plt.ready().then(() => {
      this.dogs = [];
      this.walk = this.infoServ.walkInfo;
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

      if(this.walk) {
        this.redrawPath(this.walk.path);

        for (const dog of this.walk.dogs) {
          this.dogServ.getDog(dog).subscribe((dog) => {
            console.log(dog);
            this.dogs.push(dog);
          })
        }
      }
    });
  }

  findLength(start, end) {
    return new Promise<any>((resolve, reject) => {
      const a = moment(start);
      const b = moment(end);

      const length = b.to(a, true);
      resolve(length);
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

}
