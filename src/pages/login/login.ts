import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from "../../providers/login/login";
import { TabsPage } from "../../pages/tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ LoginProvider ]
})
export class LoginPage {

  private username: string;
  private password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider: LoginProvider) {}

  ionViewDidLoad() {}

  private login() {
    this.loginProvider.doLogin(this.username, this.password)
      .then((value: any) => {
        if (value.ok) {
          // login success
          const token = value.token;
          localStorage.setItem("token", token);
          this.navCtrl.setRoot(TabsPage);
        } else {
          // login fail
          console.error(value.error)
        }

      })
      .catch((error) => {
        console.error(error);
        throw error;
      })
  }


}
