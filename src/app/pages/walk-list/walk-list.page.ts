import { Route } from './../../model/route';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';

declare var google;

@Component({
  selector: 'app-walk-list',
  templateUrl: './walk-list.page.html',
  styleUrls: ['./walk-list.page.scss'],
})
export class WalkListPage implements OnInit {

  previousTracks : Route[] = [];
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  constructor(
    private storage: Storage,
    private plt: Platform,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
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

  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
        for (const route of this.previousTracks) {
          this.findLength(route.start, route.finished).then((length) => {
            if(length) {
              route.length = length;
            }
          });
        }
        console.log(this.previousTracks);
      } else {
        console.log('no data');
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

  showHistoryRoute(route) {
    this.redrawPath(route);
  }

  viewNotes(route) {
    
  }

}
