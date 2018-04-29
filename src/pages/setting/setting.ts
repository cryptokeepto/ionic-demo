import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Push, PushOptions, PushObject } from "@ionic-native/push";

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [Push]
})
export class SettingPage {

  private accept: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private push: Push) {

  }

  ionViewDidLoad() {

  }

  changeToggle() {
    console.log(this.accept)
    if (this.accept) {


      
      const options: PushOptions = {
        android: {
          senderID: "577106127826",
          sound: true
        }
      }
      const push: PushObject = this.push.init(options);
      push.on("registration").subscribe(
        (registration) => console.log("device registor", registration),
        (error) => console.error(error)
      )
    } else {
      
    }
  }

}
