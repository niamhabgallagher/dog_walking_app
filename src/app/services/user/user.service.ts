import { User } from './../../model/User';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<User>;
  private user: Observable<User[]>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<User>('user_info');

    this.user = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        });
      })
    );
  }

  getUsers() {
    return this.user;
  }

  getUser(id) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateUser(user: User, id: string) {
    return this.userCollection.doc(id).update(user);
  }

  addUser(user: User) {
    return this.userCollection.add(user);
  }

  removeUser(id) {
    return this.userCollection.doc(id).delete();
  }
}
