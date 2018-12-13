import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-xlogin',
  templateUrl: './xlogin.component.html',
  styleUrls: ['./xlogin.component.css']
})
export class XloginComponent implements OnInit {

  xcorreo: string = '';
  xclave: string = '';
  xempresa: number = 0;

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  signin() {


    if (this.xcorreo == 'admin@empresa1.com') {
      this.xempresa = 1;
    }

    if (this.xcorreo == 'admin@empresa2.com') {
      this.xempresa = 2;
    }

    if (this.xcorreo == 'admin@empresa3.com') {
      this.xempresa = 3;
    }

    localStorage.setItem('rtxUsu', this.xcorreo);
    localStorage.setItem('rtxEmp', this.xempresa.toString());



    this.router.navigate(['/home']);





  }


}
