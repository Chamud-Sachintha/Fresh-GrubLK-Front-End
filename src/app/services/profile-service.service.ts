import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../shared/models/Profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(private http: HttpClient) { }

  addNewProfileDetails(profileDetails: Profile):Observable<any[]> {
    const path = "http://localhost:3000/profile/addNewProfileDetails";
    return this.http.post<any[]>(path, profileDetails);
  }
}
