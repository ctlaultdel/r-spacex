import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {
  spaceXURL = 'https://api.spacexdata.com/v5/launches';
  launches: any;
  constructor(private http: HttpClient) {}
  
  getLaunches(): Observable<any> {
    this.launches = this.http.get(this.spaceXURL);
    return this.launches
  }

  processLaunches(launches: any) {
    this.launches = launches.map((launch: any) => {
      // add launch year
      const date = new Date(launch.date_unix * 1000);
      const year = date.getFullYear();
      // add showLinks key
      return { ...launch, launch_year: year, showLinks: false };
    });
    return this.launches
  }

  sortBy(key: string) {
    // Validity check - sorting key
    if (!this.launches[0].hasOwnProperty(key)) {
      throw new Error('Key to sort by does not exist in launch data.')
    }

    switch (key) {
      case 'name':
        this.launches.sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
        break;
      case 'flight_number':
        this.launches.sort((a: any, b: any) => a.flight_number - b.flight_number);
        break;
    }
    return this.launches
  }
}
