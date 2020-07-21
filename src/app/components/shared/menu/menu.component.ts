import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from '../../security';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: string;
  esAdmin: boolean;

  constructor(private auth: AuthService, private token: TokenService, private router: Router) {
    auth.handleAuthentication();

    this.usuario = localStorage.getItem('rtxUsu');
    let tk = token.Get();
    this.esAdmin = tk.isAdmin;
    console.log(this.usuario);

  }

  ngOnInit() {
  }

  public login(): void {
    this.auth.login();

  }

  public salir(): void {
    this.auth.logout();
    this.token.ClearToken();
    this.router.navigate(['/login']);
  }



}
