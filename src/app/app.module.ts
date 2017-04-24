import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GetAccountPage } from '../pages/get-account/get-account';
import { UserPage } from '../pages/user/user';
import { UserCarsPage } from '../pages/user-cars/user-cars';
import { ConsumptionPage } from '../pages/consumption/consumption';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
	apiKey: "AIzaSyAOBUOKZGE-k36kADAEUbZWHVJxIysKZIo",
    authDomain: "daw2-proyecto.firebaseapp.com",
    databaseURL: "https://daw2-proyecto.firebaseio.com",
    storageBucket: "daw2-proyecto.appspot.com",
    messagingSenderId: "203536795549"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GetAccountPage,
    UserPage,
    UserCarsPage,
    ConsumptionPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GetAccountPage,
    UserPage,
    UserCarsPage,
    ConsumptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
