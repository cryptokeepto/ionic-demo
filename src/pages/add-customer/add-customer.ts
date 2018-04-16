import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomerProvider } from "../../providers/customer/customer";
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from "moment";

interface IResponse {
  id: number, 
  name: string 
}

@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: [ Camera ]
})
export class AddCustomerPage {

  private token: string;
  private sexes: Array<IResponse> = [];
  private groups: Array<IResponse> = [];

  private firstName: string;
  private lastName: string;
  private sex: string;
  private email: string;
  private telephone: string;
  private customerTypeId: number;
  private image: string;
  private date: string;
  private base64Image: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private customerProvider: CustomerProvider,
    private camera: Camera
  ) {
    this.token = localStorage.getItem("token");
    this.sexes.push({ id: 1, name: "ชาย" });
    this.sexes.push({ id: 2, name: "หญิง" });
    this.date = moment().format("YYYY-MM-DD");
  }

  ionViewDidLoad() {
    this.customerProvider.getGroups(this.token)
      .then((value: { ok: boolean, rows: Array<IResponse> }) => {
        this.groups = value.rows;
      })
      .catch((error) => {
        console.error(error);
      })
  }

  private save() {
    const customer = {
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      email: this.email,
      telephone: this.telephone,
      customerTypeId: this.customerTypeId,
      image: this.image ? this.image : null
    }

    this.customerProvider.saveCustomer(this.token, customer)
      .then((value: { ok: boolean, rows: Array<IResponse> }) => {
        console.log(value)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  private takePicture() {
    const options: CameraOptions = {
      destinationType: 0,
      sourceType: 1
    }
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = imageData;
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      })
      .catch((error) => {
        console.warn("Can not open camera");
        throw error
      })
  }

  private browsePicture() {
    const options: CameraOptions = {
      destinationType: 0,
      sourceType: 1
    }
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = imageData;
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      })
      .catch((error) => {
        console.warn("Can not open camera");
        throw error
      })
  }

 

}
