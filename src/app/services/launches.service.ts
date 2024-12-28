import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {
  spaceXURL = 'https://api.spacexdata.com/v5/launches/latest';

  constructor(private http: HttpClient) {}
  
  getLaunches(): Observable<any> {
    return this.http.get(this.spaceXURL);
  }
}
