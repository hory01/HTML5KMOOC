import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private apiUrl = 'http://81.2.241.234:8080/hero/';
  private httpGetOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded; charset=utf-8'
    })
  };
  private httpPostOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=utf-8' //'',
    })
  };
  private httpDeleteOptions = {
    headers: new HttpHeaders({
      'Content-Type':  "application/json"
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  async deleteHero(id:number){
    return await this.httpClient.delete(this.apiUrl+id,this.httpDeleteOptions);
  }

  async getHeroes(){
    var data = '?start=0&count=0&orderfield=id&orderdirection=ASC';
    var res = await this.httpClient.get<Hero[]>(this.apiUrl+data,this.httpGetOptions);
    return res;
  }

  async createHero(h : Hero){
    let body = new HttpParams()
      .set('name', h.name)
      .set('desc', h.description);
      // var res = await
      return await this.httpClient.post(this.apiUrl, body, this.httpPostOptions);
  }

  async modHero(h : Hero){
    let body = new HttpParams()
      .set('id', h.id.toString())
      .set('name', h.name)
      .set('desc', h.description);
    var res = await this.httpClient.put(this.apiUrl+h.id, body,this.httpPostOptions);
    return res;
  }
}