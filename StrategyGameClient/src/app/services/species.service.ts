import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Species } from '../models/Species';
@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private apiUrl = 'http://81.2.241.234:8080/species/';
  private httpGetOptions = {
    headers: new HttpHeaders({ 
      'Content-Type':  'application/x-www-form-urlencoded; charset=utf'
    }) };
  private httpPostOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' //'',
    })
  };
  private httpDeleteOptions = {
    headers: new HttpHeaders({
      'Content-Type':  "application/json"
    })
  } 

  constructor(private httpClient: HttpClient) {
  }

  async deleteSpecies(id:number){
    return await this.httpClient.delete(this.apiUrl+id,this.httpDeleteOptions);
  }

  async getSpecies(){ 
    var data = '?start=0&count=0&orderfield=id&orderdirection=ASC';
    return await this.httpClient.get<Species[]>(this.apiUrl+data,this.httpGetOptions); 
  }

  async createSpecies(s : Species){
    let body = new HttpParams()
      .set('name', s.name)
      .set('desc', s.description);

    return this.httpClient.post(this.apiUrl, body, this.httpPostOptions);
  }

  async modSpecies(s : Species){
    let body = new HttpParams()
    .set('id', s.id.toString())
    .set('name', s.name)
    .set('desc', s.description);

    return await this.httpClient.put(this.apiUrl + s.id, body, this.httpPostOptions);
  }
}
