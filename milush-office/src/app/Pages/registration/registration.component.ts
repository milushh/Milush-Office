import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-registration',
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './registration.component.html',
  standalone: true,
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userRole: string = '';
  error: string = '';
  errorValid: string = '';
  errorPassword: string = '';
  showSuccessMessage: boolean = false;
  isSubmitting: boolean = false;

  constructor(private registrationService: AuthService){}
  http = inject(HttpClient);
  

  // метод для регистрации
  registration(){
     this.errorValid = "";
    this.errorPassword = "";
    this.error = "";


    if(
      !this.userName ||
      !this.userEmail ||
      !this.userPassword
    ){
      this.errorValid = "ПОЖАЛУЙСТА ЗАПОЛНИТЕ ВСЕ ПОЛЯ";
      return
    }


    if(this.userPassword.length < 6){
      this.errorPassword = "ПАРОЛЬ ДОЛЖЕН БЫТЬ НЕ МЕНЕЕ 6 СИМВОЛОВ";
      return;
    }

    const formdata = new FormData();
    formdata.append("username", this.userName);
    formdata.append("password", this.userPassword);
    formdata.append("email", this.userEmail);
    formdata.append("role", this.userRole )

   this.registrationService.registerUser(formdata).subscribe({
  next: (res: any) => {
    if(res.message === "Регистрация прошла успешно") {
      this.showSuccessMessage = true;
      this.error = "";
    } else {
      this.error = res.message || "Не удалось зарегистрироваться";
    }
    this.isSubmitting = false;
  },
  error: (e) => {
    this.error = e.error?.message || "Ошибка регистрации";
    console.error("ОШИБКА Http: ", e);
    this.isSubmitting = false;
  }
});
  }

}
