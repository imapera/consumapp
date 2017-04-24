import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { AlertController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-get-account',
  templateUrl: 'get-account.html'
})
export class GetAccountPage {

	regForm = {};
	
	users: FirebaseListObservable<any>;
	user : FirebaseObjectObservable<any>;
	aux : any;
	af : AngularFire;
	subscription : any;

 	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, af: AngularFire) {
		this.users = af.database.list('/users'); 
		this.af = af;
 	}

	tryRegister(){	
			
		if (!this.regForm['username']){
			let prompt = this.alertCtrl.create({
				title: 'Error',
				message: "Empty username",
			});
	  		prompt.present();
		} else if (!this.regForm['pass1'] || !this.regForm['pass2']) {
			let prompt = this.alertCtrl.create({
				title: 'Error',
				message: "You must set password twice",
			});
	  		prompt.present();
		} else if (this.regForm['pass1'] != this.regForm['pass2']) {
			let prompt = this.alertCtrl.create({
				title: 'Error',
				message: "Passwords do not match",
			});
	  		prompt.present();
	  	} else if (!this.regForm['email']){
			let prompt = this.alertCtrl.create({
				title: 'Error',
				message: "Empty email",
			});
	  		prompt.present();  		  	
		} else {
			this.user = this.af.database.object('/users/'+this.regForm['username']);
			this.subscription = this.user.subscribe(x => {
				if (x.password) {
					let prompt = this.alertCtrl.create({
						title: 'Error',
						message: "The user already exists"
					});
	  				prompt.present();  
				} else {
					this.users.update(this.regForm['username'], {
						password : this.regForm['pass1'],
						email : this.regForm['email']
					});	
					this.aux = this.navParams.get('view');
					this.aux.registerResult="Account created";
					this.navCtrl.pop();
				}	
				this.subscription.unsubscribe();		
			});
		}		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GetAccountPage');
	}
}
