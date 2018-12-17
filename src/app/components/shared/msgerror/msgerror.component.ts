import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-msgerror',
  templateUrl: './msgerror.component.html',
  styleUrls: ['./msgerror.component.css']
})
export class MsgerrorComponent implements OnInit {
  @Input('error') msjErr: string = "Ocurrio un Error";
  constructor() { }

  ngOnInit() {
  }

}
