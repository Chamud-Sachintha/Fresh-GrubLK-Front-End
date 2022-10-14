import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegModel } from 'src/app/shared/models/RegModel';

@Injectable({
	providedIn: 'root'
})
export class AuthServiceService {

	constructor(private http: HttpClient) { }

	signUpUser(newUser: RegModel): Observable<any> {
		const path = "http://localhost:3000/customer/signup";
		return this.http.post(path, newUser);
	}

	signUpSeller(newUser: RegModel): Observable<any> {
		console.log(newUser);
		const path = "http://localhost:3000/seller/signup";
		return this.http.post(path, newUser);
	}

	signInCustomer(loginUserDetails: RegModel): Observable<any> {
		const path = "http://localhost:3000/customer/login";
		return this.http.post(path, loginUserDetails);
	}

	signInSeller(loginUserDetails: RegModel): Observable<any> {
		const path = "http://localhost:3000/seller/login";
		return this.http.post(path, loginUserDetails);
	}
}
