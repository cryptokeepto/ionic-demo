import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

@Injectable()
export class UserProvider {

  private url: string = "https://jsonplaceholder.typicode.com";

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  public getUsers(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http.get(`${this.url}/users`)
        .subscribe(
          res => resolve(res),
          err => reject(err)
        );
    });
    return promise;
  }

}
