import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchesService } from '../services/launches.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})

export class GridComponent implements OnInit {
  launches: any = [];
  p: number = 1;
  selectedSortOption: string = 'flight_number';
  selectedRow: any = null;

  constructor(private launchesService: LaunchesService) {}

  ngOnInit(): void {
    this.launchesService.getLaunches().subscribe((data: any[]) => {
      this.launches = this.launchesService.processLaunches(data);
    })
  }

  sortResults() {
    // deselect rows since order is going to change
    this.selectRow(null)
    this.launches = this.launchesService.sortBy(this.selectedSortOption)
  }

  selectRow(i: any) {
    // deselect prev row
    if (this.selectedRow) this.launches[this.selectedRow].showLinks = false

    // select new row
    if (i) this.launches[i].showLinks = true
    // set new selected row
    this.selectedRow = i || null
  }
}
