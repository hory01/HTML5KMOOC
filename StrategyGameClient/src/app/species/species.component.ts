import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SpeciesService } from '../services/species.service';
import { Species } from '../models/species';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {
  ss: SpeciesService;
  species: Species[] = [];
  spec = new Species();
  data: Species[];
  displayedColumns: string[] = ['id', 'name', 'description'];
  public dataSource: MatTableDataSource<Species>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(speciesService: SpeciesService, private cdRef: ChangeDetectorRef) {
    this.ss = speciesService;
    this.spec = new Species();
    this.dataSource = new MatTableDataSource<Species>();
  }

  async ngOnInit() {
    await this.getSpecies();
    this.dataSource.paginator = this.paginator;
  }

  async getSpecies() {
    var res = await this.ss.getSpecies();
    await res.subscribe(
      (s: any) => {
        this.dataSource.data = s as Species[];
        this.cdRef.detectChanges();
      });
  }

  async deleteSpecies() {
    var res = await this.ss.deleteSpecies(this.spec.id);
    await res.subscribe(
      async () => {
        await this.refresh();
      });
  }

  async createSpecies() {
    var res = await this.ss.createSpecies(this.spec);
    await res.subscribe(
      async () => {
        await this.refresh();
      });
  }

  async modHero() {
    var res = await this.ss.modSpecies(this.spec);
    await res.subscribe(
      async () => {
        await this.refresh();
      });
  }

  async refresh() {
    this.dataSource = new MatTableDataSource<Species>();
    this.dataSource.paginator = this.paginator;
    var res = await this.ss.getSpecies();
    res.subscribe(
      async (s: any) => {
        this.dataSource.data = s as Species[];
        this.cdRef.detectChanges();
      });
  }
}
