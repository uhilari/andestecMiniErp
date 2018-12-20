import { Component, OnInit, Input } from '@angular/core';
declare var swal: any;

@Component({
  selector: 'app-msgsuccess',
  templateUrl: './msgsuccess.component.html',
  styleUrls: ['./msgsuccess.component.css']
})
export class MsgsuccessComponent implements OnInit {
  @Input('textoOk') msjCorrecto: string;
  constructor() {


    swal("Good job!", "Registro correcto!", "success");

    // if (this.msjCorrecto == "") {
    //   this.msjCorrecto = "Listo!";
    // }
  }

  ngOnInit() {
  }

}
