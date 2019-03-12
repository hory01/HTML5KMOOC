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
  public dataSource: MatTableDataSource<Hero>; //= new MatTableDataSource<Hero>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(heroService: HeroesService, private cdRef:ChangeDetectorRef) { 
    this.hs = heroService;
    this.hero = new Hero();
    this.dataSource = new MatTableDataSource<Hero>();
  }

  async ngOnInit() {
    await this.getHeroes();
    this.dataSource.paginator = this.paginator;
  }

  async getHeroes(){
    var res = await this.hs.getHeroes();
    await res.subscribe(
      (h:any) => {
        this.dataSource.data = h as Hero[];
        this.cdRef.detectChanges();
      });
  }

  async deleteHero(){
    var res = await this.hs.deleteHero(this.hero.id);
    await res.subscribe(
      async () =>{
        await this.refresh();
      }
    );
  }
  
  async createHero(){
    var res = await this.hs.createHero(this.hero);
    await res.subscribe(
      async () =>{
        await this.refresh();
      }
    );
  }

  async modHero(){
    var res = await this.hs.modHero(this.hero);
    await res.subscribe(
      async () =>{
        await this.refresh();
      }
    );
    
  }

  async refresh(){
    this.dataSource = new MatTableDataSource<Hero>();
    this.dataSource.paginator = this.paginator;
    var res = await this.hs.getHeroes();
    res.subscribe(
      async (h:any) => {
        this.dataSource.data = h as Hero[];
        this.cdRef.detectChanges();
      }
    );
  }
}