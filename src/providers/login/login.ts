import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient, @Inject("API_URL") private url: string) {
    console.log(this.url);
  }

  public doLogin(username: string, password: string) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const body = {
      "username": username,
      "password": password
    };

    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/users/login`, body, { headers: headers })
        .subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        )
    });
  }

}
