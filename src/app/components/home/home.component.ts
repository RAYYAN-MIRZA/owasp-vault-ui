import { Component, OnInit } from '@angular/core';
import { SecureApiService } from '../../services/secure-api.service';
import { Hello } from '../../interface/hello';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements  OnInit{
  res!:Hello ;
  constructor(private secureService:SecureApiService){    }
  ngOnInit(): void {

    
  }
}
