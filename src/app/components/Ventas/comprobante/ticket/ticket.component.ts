import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { Ms_DetComprotmp } from 'src/app/components/shared/modelos/Ms_DetComprotmp';
import { ticket } from 'src/app/components/shared/modelos/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  detalles: Ms_DetComprotmp[];
  fechatext: string;
  horatext: string;
  ticketTmp: ticket;

  constructor(private sv: VentasService) {

    let fec = new Date();
    this.fechatext = fec.getDate() + '/' + (fec.getMonth() + 1) + '/' + fec.getFullYear();
    this.horatext = fec.getHours() + ':' + fec.getMinutes() + ':' + fec.getSeconds();
  }

  ngOnInit() {
    this.ticketTmp = this.sv.getTicket();
    this.detalles = this.sv.getDetalleComprobante();
  }

  imprimir() {
    window.print();
  }

}
