import { Component } from '@angular/core';

import {NavController, AlertController} from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {UserPage} from '../user/user';
import {UserCarsPage} from '../user-cars/user-cars';
import {GetAccountPage} from '../get-account/get-account';


@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})

export class HomePage {

	logForm = {};
	registerResult : any;
	subscription : any;
	user : FirebaseObjectObservable<any>;
	af : AngularFire;

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire) {
		this.af = af;	
		//this.navCtrl.push(UserCarsPage,{username : 'imapera'});
	}
	
	tryLog(){		
		this.user = this.af.database.object('/users/'+this.logForm['username']);
		this.subscription = this.user.subscribe(x => {
			if (this.logForm['username']) {
				if (this.logForm['password']==x.password){
					this.registerResult="";
					this.navCtrl.push(UserCarsPage,{username : this.logForm['username']});
				} else {
					this.registerResult="The user and password do not match";
				}
			} else {
				this.registerResult="The username is empty";			
			}
			this.subscription.unsubscribe();
		});		
	}
	
	goToGetAccount(){
		this.navCtrl.push(GetAccountPage,{view : this});
	}	
	
	ionViewDidEnter(){
		this.logForm['password']="";
		this.logForm['username']="";
	}
}

