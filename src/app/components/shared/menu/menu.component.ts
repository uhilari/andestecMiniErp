import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthService) { 
    auth.handleAuthentication();
  }

  ngOnInit() {
  }

  public login(): void {
    this.auth.login();
    
  }

  public salir(): void {
    this.auth.logout();
  }

}
