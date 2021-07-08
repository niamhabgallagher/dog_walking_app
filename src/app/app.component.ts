import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storage: StorageService
  ) {

  }

  initialiseApp() {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBlUMG8VRNlxzKN-YZaqDM4ijmM420PYPE",
      authDomain: "doggi-walks.firebaseapp.com",
      databaseURL: "https://doggi-walks-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "doggi-walks",
      storageBucket: "doggi-walks.appspot.com",
      messagingSenderId: "53929419445",
      appId: "1:53929419445:web:8424a4623d05a92dcf94fc",
      measurementId: "G-2D6SK5CWQF"
    };

    this.platform.ready().then(async () => {
      await this.storage.init(); // Initialise storage
      firebase.initializeApp(firebaseConfig);
    });
  }
}
