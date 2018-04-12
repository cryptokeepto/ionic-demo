import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  private user: { name: string, email: string } = { name: null, email: null };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    this.user = this.navParams.get("_user");
  }

}
