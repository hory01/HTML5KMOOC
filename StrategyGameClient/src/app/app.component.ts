import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Strategy';
  isHero : Boolean;
  isSpecies : Boolean;

  ngOnInit() {  
    this.isHero = true;
    this.isSpecies = false; }

  showHero() {
    this.isSpecies=false;
    this.isHero=true;
  }

  showSpecies(){
    this.isHero=false;
    this.isSpecies=true;
  }
}
