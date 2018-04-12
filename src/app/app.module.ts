import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from "../pages/map/map";
import { ContactPage } from "../pages/contact/contact";
import { TabsPage } from "../pages/tabs/tabs";
import { MessagePage } from "../pages/message/message";
import { SettingPage } from "../pages/setting/setting";
import { LoginPage } from "../pages/login/login";

import { UserProvider } from '../providers/user/user';
import { LoginProvider } from '../providers/login/login';
import { CustomerProvider } from '../providers/customer/customer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ContactPage,
    TabsPage,
    MessagePage,
    SettingPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ContactPage,
    TabsPage,
    MessagePage,
    SettingPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide:  "API_URL", useValue: "http://localhost:3000" },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CustomerProvider
  ]
})
export class AppModule { }
