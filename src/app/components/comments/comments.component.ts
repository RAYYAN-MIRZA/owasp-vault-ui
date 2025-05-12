import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SecureApiService } from '../../services/secure-api.service';
import { UnsecureApiService } from '../../services/unsecure-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  text: string = '';
  secure = false;
  comments: any[] = [];
  isSecureMode:boolean = false;


  constructor(private router:ActivatedRoute,private unsecureService: UnsecureApiService,private secureService:SecureApiService,private sanitizer: DomSanitizer){    }
  
  ngOnInit() {
    this.router.data.subscribe(data => {
      this.isSecureMode = data['routeType'] === 'secure';
      this.loadComments();
      console.log("Route Changed");
    });
  }

  loadComments():void{
    if(this.isSecureMode){
      this.secureService.getComments().subscribe(com =>{        
        this.comments = com.map((c: any) => ({          
          html:c.text
        }));
      
      })
    }
    else{
      this.unsecureService.getComments().subscribe(com =>{        
          this.comments = com.map((c: any) => ({
            raw: c.text,
            html: this.isSecureMode
              ? c.text
              : this.sanitizer.bypassSecurityTrustScript(c.text)
          }));
          console.log(this.comments);
      })
    }
  }


  postComment():void{
    if(this.isSecureMode){
      this.secureService.saveComments(this.text).subscribe({
      next: (re) => {          
            this.loadComments();
            this.text= '';
          },
          error: (err) => {
            console.error('Error:', err);
            this.text= '';
          },
          complete: () => {
            console.log('Request complete');
            this.text= '';
          }    
      });
    }
    else{
        this.unsecureService.saveComments(this.text).subscribe({
        next: (re) => {
              this.loadComments();
              this.text= '';
            },
            error: (err) => {
              console.error('Error:', err);
              this.text= '';
            },
            complete: () => {
              console.log('Request complete');
              this.text= '';
            }    
        });      
      }
  }
}
