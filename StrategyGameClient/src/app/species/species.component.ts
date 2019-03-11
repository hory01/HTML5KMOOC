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
  species : Species[] = [];
  spec = new Species();
  data : Species[];
  displayedColumns: string[] = ['id','name','description'];
  public dataSource = new MatTableDataSource<Species>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(speciesService: SpeciesService, private cdRef:ChangeDetectorRef) { 
    this.ss = speciesService;
    this.spec = new Species();
  }

  ngOnInit() {
    this.getSpecies();
    this.dataSource.paginator = this.paginator;
  }

  getSpecies(){
    this.ss.getSpecies().subscribe(
      (s:any) => {this.dataSource.data = s as Species[]}
    );
  }

  deleteSpecies(){
    this.ss.deleteSpecies(this.spec.id);
  }
  
  createSpecies(){
    this.ss.createSpecies(this.spec);
  } 
}