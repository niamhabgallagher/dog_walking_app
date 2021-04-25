import { map } from 'rxjs/operators';
import { DogInfo } from './../../model/DogInfo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  private dogCollection: AngularFirestoreCollection<DogInfo>;
  private dogs: Observable<DogInfo[]>

  constructor(db: AngularFirestore) { 
    this.dogCollection = db.collection<DogInfo>('dog_info');

    this.dogs = this.dogCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          data.id = id;
          return {id, ...data};
        });
      })
    );
  }

  getDogs() {
    return this.dogs;
  }

  getDog(id) {
    return this.dogCollection.doc<DogInfo>(id).valueChanges();
  }

  updateDog(dog: DogInfo, id: string) {
    return this.dogCollection.doc(id).update(dog);
  }

  addDog(dog: DogInfo) {
    return this.dogCollection.add(dog);
  }

  removeDog(id) {
    return this.dogCollection.doc(id).delete();
  }
}
