import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = "https://fathomless-hamlet-56105.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private loggedIn = false;
  private authToken: string;

  constructor(
    private http: HttpClient
  ) { }

  get isLoggedIn() {
    return this.loggedIn;
  }

  setLoggedIn(loggedIn: boolean, authToken?: string) {
    this.loggedIn = loggedIn;
    this.authToken = authToken;
  }

  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }

    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.authToken}` } : undefined;

    return this.http.request(method, baseUrl + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  get(route: string, data?: any) {
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.authToken}` } : undefined;

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(baseUrl + route, {
      responseType: 'json',
      headers: header,
      params
    });
  }
}