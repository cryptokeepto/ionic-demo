import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';

import { MapPage } from "../map/map";
import { CustomerProvider } from "../../providers/customer/customer";
import { LoginPage } from "../login/login";

interface IResponse {
  ok: boolean,
  rows: Object[]
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ CustomerProvider ]
})
export class HomePage {

  private customers: any;
  private token: string;

  constructor(
    public navCtrl: NavController, 
    private customerProvider: CustomerProvider, 
    private loadingCtrl: LoadingController,
    private app: App
  ) {
    this.token = localStorage.getItem("token");
  }

  private ionViewDidLoad() {}

  private ionViewWillEnter() {
    // loading
    const loading = this.loadingCtrl.create({
      spinner: "dots",
      content: "Loading"
    });
    loading.present();

    this.customerProvider.getCustomers(this.token)
      .then((data: IResponse) => {
        if (data.ok) {
          this.customers = data.rows;
          console.log(this.customers)
          loading.dismiss();
        } else {
          loading.dismiss();
          console.error("get data customers fail");
        }
      }).catch((error) => {
        loading.dismiss();
        console.error(error);
      })
  }

  private goDetail(customer) {
    console.log(customer)
    // this.navCtrl.push(MapPage, { _user: user });
  }

  private logout() {
    let nav = this.app.getRootNav()

    localStorage.removeItem("token");
    nav.setRoot(LoginPage);
  }

}
