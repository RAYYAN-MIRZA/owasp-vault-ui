 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecureApiService } from '../../services/secure-api.service';
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.scss'
// })
// export class ProfileComponent {

// }
// ----------------
// profile.component.ts
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'

})
export class ProfileComponent implements OnInit {
  profile:string | null = null;
  userId:number | null = null;
  isSecureMode:boolean =false;
  toShow:boolean = true;
  constructor(private route: ActivatedRoute,private secureService:SecureApiService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.isSecureMode = data['routeType'] === 'secure'?true:false;
      //console.log("Route Changed");
    });
    const id = this.route.snapshot.paramMap.get('id'); // e.g., /profile/3
    this.profile = id; // userid

   this.secureService.userId$.subscribe(id => {
      this.userId = id// logged in '
      if(this.userId ==null)
        this.userId = this.secureService.getUserId();

      if(this.userId != null && this.profile != null){        
        if(this.userId != parseInt(this.profile) && this.isSecureMode ==true)
          //alert('Cannot Route to unknown User');
            this.toShow=false
        // else if(this.userId == parseInt(this.profile) && this.isSecureMode ==true)  
        //     { 
        //       this.toShow = true;
        //     }
        //     else {
        //       this.toShow = true;
        //     }
      }
    });
    

    // this.http.get(`/api/profile/${id}`).subscribe((res: any) => {
    //   this.profile = res;
    // });
  }
}
