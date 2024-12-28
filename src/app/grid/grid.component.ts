import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { LaunchesService } from '../services/launches.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  launches: any;
  grid = 'test grid';

  constructor(private launchesService: LaunchesService) {}

  ngOnInit(): void {
    this.launchesService.getLaunches().subscribe((data: any[]) => {
      this.launches = data;
      console.log(this.launches)
    })
  }
}
