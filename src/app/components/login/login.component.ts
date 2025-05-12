
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { UnsecureApiService } from '../../services/unsecure-api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SecureApiService } from '../../services/secure-api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';
  message = '';
  userId:null | number = null;
  isSecureMode:boolean = false;
  constructor(private router:ActivatedRoute,private unsecureService: UnsecureApiService,private secureService:SecureApiService) {    
  }

  ngOnInit() {

    this.router.data.subscribe(data => {
      this.isSecureMode = data['routeType'] === 'secure';
  //    console.log("Route Changed");
    });
    this.secureService.userId$.subscribe(id => {
      this.userId = id
    });
    
    
  
  }

  unsecureLogin(): void {
    this.unsecureService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.message = response.message;
       console.log('User:', response.user); // Log user info
        this.secureService.setUserId(response.user.Id);
      },
      error: (error) => {
        console.error(error);
        this.message = 'Something went wrong.';
      }
    });
  }

  secureLogin():void{
    this.secureService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.message = response.message;
  //      console.log('User:', response.user); //NOt Log user info
        this.secureService.setUserId(response.user.Id);
      },
      error: (error) => {
        console.error(error);
        this.message = 'Something went wrong.';
      }
    });
  }

}
