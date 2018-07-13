import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaestrosService } from '../../services/maestros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor( private maestroService: MaestrosService) {


  }

  ngOnInit() {
  }

}
