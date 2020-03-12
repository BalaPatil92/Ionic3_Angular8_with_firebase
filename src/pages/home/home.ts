import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { RegistrationListPage } from '../registration-list/registration-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  simple_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public firebaseService: FirebaseService,
    public toastCtrl: ToastController
   
  ) {

  }

  ionViewWillLoad(){
    this.getData();
  }

  getData(){
    this.simple_form = this.formBuilder.group({
      id: new FormControl(null),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl(0),
      place: new FormControl(''),
      contactNo:new FormControl(0),
      address:new FormControl(''),
      isConfirm:new FormControl(false)
    });
  }

  add(value){
    value.isConfirm = false;

     // Making the copy of the form and assigning it to the studentData.
     let studentData = Object.assign({}, value);

     // To avoid messing up the document id and just update the other details of the student. We will remove the 'property' from the student data.
     delete studentData.id;

    this.firebaseService.addUser(studentData)
    .then( res => {
      let toast = this.toastCtrl.create({
        message: 'User was created successfully',
        duration: 3000
      });
      toast.present();
      this.resetFields();
    }, err => {
      console.log(err)
    })
          // // Making the copy of the form and assigning it to the studentData.
          // let studentData = Object.assign({}, value);

          // // To avoid messing up the document id and just update the other details of the student. We will remove the 'property' from the student data.
          // delete studentData.id;
      
          // // Does the insert operation.
          // if (value.id == null) {
          //   this.db.collection('registration').add(studentData);
          //       let toast = this.toastCtrl.create({
          //        message: studentData.fullName + ' information is successfully saved!',
          //        duration: 3000
          //      });
          //      toast.present();
          //  } else {
          //   // Does the update operation for the selected student.
          //   // The 'studentData' object has the updated details of the student.
          //   this.db.doc('registration/' + value.id).update(studentData);
          //   let toast = this.toastCtrl.create({
          //    message: ' Student successfully updated!',
          //    duration: 3000
          //  });
          //  toast.present();
          // }
  }

  resetFields(){
    this.simple_form.reset()
  }

  readUser(){
    this.navCtrl.push(RegistrationListPage);
  }

}
