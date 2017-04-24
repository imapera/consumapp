import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

/*
  Generated class for the Consumption page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-consumption',
  templateUrl: 'consumption.html'
})
export class ConsumptionPage {

	consumptionForm = {};
	consumptionObject : FirebaseObjectObservable<any>;
	username : any;
	car : any;
	consumption : any;
	date : any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  		
  		this.username = navParams.get('username');
  		this.car = navParams.get('car');
  		this.consumption = navParams.get('consumption');
  		
  		this.consumptionObject = af.database.object('/users/' + this.username + '/cars/' + this.car  + '/consumptions/' + this.consumption); 

  		this.consumptionObject.subscribe(x => {
			this.consumptionForm['litres']=x.litres;		
			this.consumptionForm['euros']=x.euros;		
			this.consumptionForm['kilometres']=x.kilometres;
			var d = new Date(x.date);
			this.date=d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + " at " + d.getHours() + ":" + d.getMinutes();
		});
  	}
  	
	saveChanges(){
		this.consumptionObject.update({
			euros: this.consumptionForm['euros'],
			litres: this.consumptionForm['litres'],
			kilometres: this.consumptionForm['kilometres'],
			price: Math.round(this.consumptionForm['euros'] / this.consumptionForm['litres'] * 100) / 100,
			consumption: Math.round(this.consumptionForm['litres'] / this.consumptionForm['kilometres'] * 10000) / 100
		});
	}

	removeConsumption(){
		this.consumptionObject.remove();
		this.navCtrl.pop();
	}
}
