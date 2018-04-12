import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { MapPage } from "../map/map";
import { UserProvider } from "../../providers/user/user";

interface User {
  name: string,
  email: string
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ UserProvider ]
})
export class HomePage {

  private users: Array<User> = [];

  constructor(
    public navCtrl: NavController, 
    private userProvider: UserProvider, 
    private loadingCtrl: LoadingController
  ) {}

  private ionViewDidLoad() {}

  private ionViewWillEnter() {
    // loading
    const loading = this.loadingCtrl.create({
      spinner: "dots",
      content: "Loading"
    });
    loading.present();

    this.userProvider.getUsers()
      .then((users) => {
        this.users = users;
        loading.dismiss();
      }).catch((error) => {
        console.error(error);
        loading.dismiss();
      })
  }

  private goDetail(user: User) {
    this.navCtrl.push(MapPage, { _user: user });
  }

}
