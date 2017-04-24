import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserPage } from '../user/user';


@Component({
  selector: 'page-user-cars',
  templateUrl: 'user-cars.html'
})

export class UserCarsPage {

	cars : FirebaseListObservable<any>;
	username : any;	
	
  	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, af: AngularFire) {
  	
  		this.username = this.navParams.get('username');
  		this.cars = af.database.list('/users/' + this.username + '/cars');  
  		
  	}

 	 ionViewDidLoad() {
    	console.log('ionViewDidLoad UserCarsPage');
  	}

	selectCar(key){
		this.navCtrl.push(UserPage,{username : this.username, car : key});
	}

	addCar(){
	  let prompt = this.alertCtrl.create({
		title: 'Data',
		message: "Select your car:",
		inputs: [
		  {
			name: 'brand',
			placeholder: 'Brand'
		  },
		  {
			name: 'model',
			placeholder: 'Model'
		  },
		  {
			name: 'version',
			placeholder: 'Version'
		  }
		],
		buttons: [
		  {
			text: 'Cancel',
			handler: data => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Save',
			handler: data => {
				this.cars.push({
					brand: data.brand,
					model: data.model,
					version: data.version,
				});
			}
		  }
		]
	  });
	  prompt.present();
	}	


}
