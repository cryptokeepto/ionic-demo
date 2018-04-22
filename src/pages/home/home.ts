import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  App, ActionSheetController,
  ActionSheetOptions,
  Platform,
  AlertController
} from 'ionic-angular';

import { MapPage } from "../map/map";
import { CustomerProvider } from "../../providers/customer/customer";
import { LoginPage } from "../login/login";
import { AddCustomerPage } from "../add-customer/add-customer";

interface IResponse {
  ok: boolean,
  rows: Object[]
}

interface IRow {
  id: number,
  first_name: string,
  last_name: string,
  sex: string,
  image: string,
  telephone: string,
  customer_type_id: number,
  email: string
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CustomerProvider]
})
export class HomePage {

  private customers: any = [];
  private token: string;

  constructor(
    public navCtrl: NavController,
    private customerProvider: CustomerProvider,
    private loadingCtrl: LoadingController,
    private app: App,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {
    this.token = localStorage.getItem("token");
  }

  private ionViewDidLoad() { }

  private ionViewWillEnter() {
    this.getCustomers();
  }

  private getCustomers() {
    const loading = this.loadingCtrl.create({
      spinner: "dots",
      content: "Loading"
    });
    loading.present();

    this.customerProvider.getCustomers(this.token)
      .then((data: IResponse) => {
        if (data.ok) {
          this.customers = data.rows;
          this.customers.map((v) => {
            v.image = "data:image/jpeg;base64," + v.image
          })
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
    console.log(this.customers)
    // this.navCtrl.push(MapPage, { _user: user });
  }

  private search(event) {
    let query: string = event.target.value;
    this.customerProvider.search(this.token, query)
      .then((data: IResponse) => {
        if (data.ok) {
          this.customers = data.rows;
          this.customers.map((v) => {
            v.image = "data:image/jpeg;base64," + v.image
          })
        } else {
          console.error("get data customers fail");
        }
      }).catch((error) => {
        console.error(error);
      })
      console.warn(this.customers)
  }

  private logout() {
    let nav = this.app.getRootNav()

    localStorage.removeItem("token");
    nav.setRoot(LoginPage);
  }

  private add() {
    this.navCtrl.push(AddCustomerPage)
  }

  private removeConfirm(customer: IRow) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'ต้องการลบรายการนี้ ใช่หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ลบข้อมูล',
          handler: () => {
            this.customerProvider.remove(this.token, customer.id)
              .then((data: IResponse) => {
                if (data.ok) {
                  console.log("delete success");
                  this.getCustomers();
                }
              })
              .catch((error) => {

              })
          }
        }
      ]
    });
    confirm.present();
  }


  private showMenu(customer: IRow) {
    const options: ActionSheetOptions = {
      title: "Action menu",
      buttons: [
        {
          text: 'ลบข้อมูล',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removeConfirm(customer);
          }
        },
        {
          text: 'แก้ไข',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(AddCustomerPage, { id: customer.id });
          }
        },
        {
          text: 'ดู/กำหนด แผนที่',
          icon: !this.platform.is('ios') ? 'map' : null
        },
        {
          text: 'โทร',
          icon: !this.platform.is('ios') ? 'call' : null
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null
        }
      ]
    }
    const actionSheet = this.actionSheetCtrl.create(options);
    actionSheet.present();
  }

}
