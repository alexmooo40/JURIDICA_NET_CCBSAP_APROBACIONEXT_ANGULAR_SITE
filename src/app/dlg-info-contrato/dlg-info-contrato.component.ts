import {Component,  Inject } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InfoContratoDTO } from '../dto/InfoContratoDTO';

@Component({
  selector: 'app-dlg-info-contrato',
  templateUrl: './dlg-info-contrato.component.html',
  styleUrl: './dlg-info-contrato.component.css'
})
export class DLGInfoContratoComponent {
  Infocontrato : InfoContratoDTO = { Proveedor:"",    Objeto:""} ;
  
  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: InfoContratoDTO) {
    this.Infocontrato.Objeto = data.Objeto;
    this.Infocontrato.Proveedor = data.Proveedor;
  }



}
