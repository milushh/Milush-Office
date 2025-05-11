import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: any = [];
  constructor(private http: HttpClient) {}
  
  registerUser(formData: FormData) {
    return this.http.post("http://localhost:5000/auth/registration", formData);
  }

}
