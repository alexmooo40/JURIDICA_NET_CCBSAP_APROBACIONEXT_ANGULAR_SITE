import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DlgMotivosRechazoComponent } from '../dlg-motivos-rechazo/dlg-motivos-rechazo.component';
import { SapServiceService } from '../sap-service.service';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
 
})
export class FormComponent implements OnInit {

  constructor( public srvUser:LoginService, public dialog: MatDialog, public srvSAp:SapServiceService) { }

  ngOnInit() {
  }
 obtenerSolped(){
  return this.srvUser.getSolped();
 }

 
 openDialog() {
  const dialogRef = this.dialog.open(DlgMotivosRechazoComponent); 
    //dialogRef.setInfoContrato
}
 rechazar_clic(){
  this.srvSAp.setStateProcess(true);
  this.openDialog()
 }

 aprobar_clic(){
  this.srvSAp.setStateProcess(true);
  this.srvSAp.aprobar();
 }
}
