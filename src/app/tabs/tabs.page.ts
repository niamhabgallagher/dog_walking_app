import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private storage: Storage,
    private firebase: FirebaseX
  ) { }

  ngOnInit() {
    this.storage.get('user_info').then((user) => {
      if(!user || user == null || user == undefined) {
        this.storage.set('user_info', null);
      } else {
        // TODO:
        // get user auth key from firebase
        // keep them logged in and get all data
        this.firebase.isUserSignedIn().then((isSignedIn) => {
          if(isSignedIn) {
            var documentId = user.documentId;
            var collection = 'user_info';
            this.firebase.fetchDocumentInFirestoreCollection(documentId, collection, function(document){
                console.log("Successfully fetched document: "+JSON.stringify(document));
                let storage: Storage;
                storage.set('user_info', document);
                console.log('user_info', document);
            }, function(error){
                console.error("Error fetching document: "+error);
            });
          } else {
            this.storage.set('user_info', null);
          }
        });
      }
    });
  }

}
