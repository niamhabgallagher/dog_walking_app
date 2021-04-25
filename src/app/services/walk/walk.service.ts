import { Route } from './../../model/Route';
import { map } from 'rxjs/operators';
import { DogInfo } from './../../model/DogInfo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalkService {

  private walkCollection: AngularFirestoreCollection<Route>;
  private walks: Observable<Route[]>

  constructor(db: AngularFirestore) { 
    this.walkCollection = db.collection<Route>('dog_info');

    this.walks = this.walkCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        });
      })
    );
  }

  getWalks() {
    return this.walks;
  }

  getWalk(id) {
    return this.walkCollection.doc<Route>(id).valueChanges();
  }

  updateWalks(walk: Route, id: string) {
    return this.walkCollection.doc(id).update(walk);
  }

  addWalk(walk: Route) {
    return this.walkCollection.add(walk);
  }

  removeWalk(id) {
    return this.walkCollection.doc(id).delete();
  }
}
