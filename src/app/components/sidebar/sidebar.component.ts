import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SecureApiService } from '../../services/secure-api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
constructor(private secureApiService: SecureApiService){}
userId:null |number =null;
    ngOnInit(): void {
      this.secureApiService.userId$.subscribe(id => {
        this.userId = id;
      });
      
    }
} 
