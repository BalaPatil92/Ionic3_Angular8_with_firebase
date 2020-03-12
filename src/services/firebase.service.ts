import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registration } from "../app/model/registation";


@Injectable()
export class FirebaseService {

  constructor(
    private db: AngularFirestore,
  ){

  }
  // add current user
    addUser(value:Registration){
      // return new Promise<any>((resolve, reject) => {
      //   this.db.collection('registration').add(value)
      //   .then(
      //     (res) => {
      //       resolve(res)
      //     },
      //     err => reject(err)
      //   )
      // })
      return this.db.collection('registration').add(value);
    }

    // get user list
    getUserRegistrationList(){
      return this.db.collection('registration').snapshotChanges();
    }

    update(value:Registration){
      console.log(value.id);
      console.log(value);
   //   delete value.id;
      this.db.doc('registration/' + value.id).update(value);
    }

    delete(id: string){
      this.db.doc('registration/' + id).delete();
    }
}
