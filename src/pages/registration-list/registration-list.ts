import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { Registration } from '../../app/model/registation';

/**
 * Generated class for the RegistrationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registration-list',
  templateUrl: 'registration-list.html',
})
export class RegistrationListPage {

  users:Registration[];
  constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        private firebaseService:FirebaseService,
        private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationListPage');
    this.readUserList();
  }

  readUserList(){
  
  this.firebaseService.getUserRegistrationList().subscribe(data => {
    console.log(data);
    this.users = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data() as {}
      } as Registration;
    })
  });
  }

  update(value){
     // Making the copy of the form and assigning it to the studentData.
     let studentData = Object.assign({}, value);
    this.firebaseService.update(studentData);
    let toast = this.toastCtrl.create({
      message: 'User was update successfully',
      duration: 3000
    });
    toast.present();
    this.readUserList();
     
     }


     delete(value){
      // Making the copy of the form and assigning it to the studentData.
      let studentData = Object.assign({}, value);
     this.firebaseService.delete(studentData.id);
     let toast = this.toastCtrl.create({
       message: 'User was deleted successfully',
       duration: 3000
     });
     toast.present();
     this.readUserList();
      }

  }

  
 


