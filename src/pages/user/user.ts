import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { ConsumptionPage } from '../consumption/consumption';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

	username : any;	
	car : any;
	carObject : FirebaseObjectObservable<any>;
	totalKilometres : any;
	averageConsumption : any;
	totalLitres : any;
	totalPrice : any;
	averagePrice : any;
	elements : any;
	todos: FirebaseListObservable<any[]>;

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, af: AngularFire) {
  		this.username = this.navParams.get('username');
  		this.car = this.navParams.get('car');
  		
  		this.carObject = af.database.object('/users/' + this.username + '/cars/' + this.navParams.get('car')); 
  	  	
  	  		
        this.todos = <FirebaseListObservable<any>> af.database.list('/users/' + this.username + '/cars/' + this.car + '/consumptions').map(items => { //first map
			this.totalKilometres=0;
			this.totalLitres=0;
			this.totalPrice=0;
			this.elements=0;
		
			return items.map(item => { //second map            
				this.totalKilometres += parseFloat(item.kilometres);
				this.totalLitres += parseFloat(item.litres);
				this.totalPrice += parseFloat(item.euros);
				this.averageConsumption = Math.round(this.totalLitres/this.totalKilometres*10000)/100;
				this.averagePrice=Math.round(this.totalPrice/this.totalLitres*100)/100;
				this.elements++;
				var d = new Date(item.date); 
				item.date=d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();         		
				return item;
			})
        });
  	}
	
	showConsumption(key){
		this.navCtrl.push(ConsumptionPage,{
			username : this.username,
			car : this.car,
			consumption : key
		});	
	}

	addConsumption(){
	  let prompt = this.alertCtrl.create({
		title: 'Data',
		message: "Enter the data of this entry:",
		inputs: [
		  {
			name: 'euros',
			placeholder: 'Euros'
		  },
		  {
			name: 'litres',
			placeholder: 'Litres'
		  },
		  {
			name: 'kilometres',
			placeholder: 'Kilometres'
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
				var d = new Date();
				this.todos.push({
					date: d.getTime(),
					euros: data.euros,
					litres: data.litres,
					kilometres: data.kilometres,
					price: Math.round(data.euros / data.litres * 100) / 100,
					consumption: Math.round(data.litres / data.kilometres * 10000) / 100
				});
			}
		  }
		]
	  });
	  prompt.present();
	}	

}
