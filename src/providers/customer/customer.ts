import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';


@Injectable()
export class CustomerProvider {

  constructor(public http: HttpClient, @Inject("API_URL") private url: string) {}

  public getCustomers(token: string) {
    const headers = new HttpHeaders({ "Content-type": "application/json", "x-access-token": token });
    
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/customers`, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    })
  }

}
