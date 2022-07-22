import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
//Administración -------------------
  public debug: boolean = false;
//----------------------------------
  //user: any;
  isLogged: boolean = false;
  isLoading: boolean = false;
  ruta!: string;
  public user!: User | null;

  constructor(private router: Router, public auth: AuthService) {
    //if(this.debug)console.log(auth.getCurrentUser());
  }

  async ngOnInit() {}

  goBack(){    
    this.router.navigate(['home']);
  }

  goLogin(){    
    this.router.navigate(['/']);
  }

  goRegister(){    
    this.router.navigate(['/register']);
  }

  goToProfile(){    
    this.router.navigate(['/profile']);
  }

  logout(){
    this.auth.logout()
    .then(() => this.router.navigate(['/']))
    .catch((e) => console.error(e.message));
  }
}
