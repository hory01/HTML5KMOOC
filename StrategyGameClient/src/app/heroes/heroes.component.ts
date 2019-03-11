import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../models/hero';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  hs: HeroesService;
  heroes : Hero[] = [];
  hero = new Hero();
  data : Hero[];
  displayedColumns: string[] = ['id','name','description'];
  public dataSource = new MatTableDataSource<Hero>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(heroService: HeroesService, private cdRef:ChangeDetectorRef) { 
    this.hs = heroService;
    this.hero = new Hero();
  }

  ngOnInit() {
    this.getHeroes();
    this.dataSource.paginator = this.paginator;
  }

  getHeroes(){
    this.hs.getHeroes().subscribe(
      (h:any) => {this.dataSource.data = h as Hero[]}
    );
  }

  async deleteHero(){
    this.hs.deleteHero(this.hero.id);
  }
  
  createHero(){
    this.hs.createHero(this.hero);
  } 
}