import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-msgsuccess',
  templateUrl: './msgsuccess.component.html',
  styleUrls: ['./msgsuccess.component.css']
})
export class MsgsuccessComponent implements OnInit {
  @Input('textoOk') msjCorrecto: string;
  constructor() {

    if (this.msjCorrecto == "") {
      this.msjCorrecto = "Listo!";
    }
  }

  ngOnInit() {
  }

}
