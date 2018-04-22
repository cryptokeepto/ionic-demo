import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';


@Injectable()
export class CustomerProvider {

  constructor(public http: HttpClient, @Inject("API_URL") private url: string) { }

  public getCustomers(token: string) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ "Content-Type": "application/json", "x-access-token": token });
      this.http.get(`${this.url}/customers`, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    })
  }

  public search(token: string, query: string) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ "Content-Type": "application/json", "x-access-token": token });
      this.http.get(`${this.url}/customers/search/${query}`, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    })
  }

  public getGroups(token: string) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ "Content-Type": "application/json", "x-access-token": token });
      this.http.get(`${this.url}/customers/groups`, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    })
  }

  public saveCustomer(token: string, customer: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ "Content-Type": "application/json", "x-access-token": token });
      const body = {
        "firstName": customer.firstName,
        "lastName": customer.lastName,
        "sex": customer.sex,
        "customerTypeId": customer.customerTypeId,
        "telephone": customer.telephone,
        "email": customer.email,
        "image": customer.image
      }

      this.http.post(`${this.url}/customers`, body, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    })
  }

  public remove(token: string, customerId: number) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ "Content-Type": "application/json", "x-access-token": token });

      this.http.delete(`${this.url}/customers/${customerId}`, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    });

  }

  public detail(token: string, customerId: number) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ "Content-Type": "application/json", "x-access-token": token });

      this.http.get(`${this.url}/customers/detail/${customerId}`, { headers: headers })
      .subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      )
    })
  }

  public updateCustomer(token: string, customer: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ "Content-Type": "application/json", "x-access-token": token });
      const body = {
        "firstName": customer.firstName,
        "lastName": customer.lastName,
        "sex": customer.sex,
        "customerTypeId": customer.customerTypeId,
        "telephone": customer.telephone,
        "email": customer.email,
        "image": customer.image,
        "customerId": customer.customerId
      }

      this.http.put(`${this.url}/customers`, body, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    })
  }



}
