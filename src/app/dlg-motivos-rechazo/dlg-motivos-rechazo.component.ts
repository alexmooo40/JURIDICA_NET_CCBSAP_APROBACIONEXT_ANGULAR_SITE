import {Component,  Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { motivoRechazoDTO } from '../dto/motivoRechazoDTO';
import { SapServiceService } from '../sap-service.service';
import { arrayBuffer } from 'stream/consumers';

@Component({
  selector: 'app-dlg-motivos-rechazo',
  templateUrl: './dlg-motivos-rechazo.component.html',
  styleUrl: './dlg-motivos-rechazo.component.css'
})
export class DlgMotivosRechazoComponent {
  

  objDatos : motivoRechazoDTO = { idMotivo:"",    motivo:""} ;

  constructor(public dialog: MatDialog, public srvSAp:SapServiceService) {
    srvSAp.llenarMotivos();
  }


aceptar_clic(){

  if(this.objDatos.idMotivo =="" || this.objDatos.idMotivo == undefined)
  {
    alert("Debe seleccionar el motivo de rechazo");
    return;
  }
  this.srvSAp.rechazarSolicitud(this.objDatos.idMotivo, this.objDatos.motivo );
  this.dialog.closeAll();
}

}
