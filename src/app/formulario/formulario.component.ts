import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';



import { solicitudDTO } from '../dto/solicitudDTO';
import { SapServiceService } from '../sap-service.service';
import { LoginService } from '../login.service';
import { DLGInfoContratoComponent } from '../dlg-info-contrato/dlg-info-contrato.component';
import { InfoContratoDTO } from '../dto/InfoContratoDTO';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],

})
export class FormularioComponent  implements AfterViewInit  {

  constructor( private SapService:SapServiceService, private userSer:LoginService, public dialog: MatDialog) {}
 dataSource : solicitudDTO[]=  [] ;
 nombreCreador: string ="";
 fechaCreacion: string = "";
 displayedColumns: string[] = ['bnfpo','knttp','matnr','txz01','meins','menge','lfdat','preis','afnam','konnr','ktpnr','flief' ];
  
 ngAfterViewInit() {
  let solped = this.userSer.getSolped();
  this.SapService.getSolpedSAP(solped).subscribe(
    data => {
     this.dataSource  = JSON.parse(data);     
     this.conusltarInformacionCreacion(this.dataSource[0].ernam);
     this.fechaCreacion = this.dataSource[0].badat;
     console.log(data);
    },
    error => {   
      console.log(error);     
    },
  )

 }
 getTotalCost(){
  return this.dataSource.map(t => ((t.preis*100) * t.menge)).reduce((acc, value) => acc + value, 0);
 }


conusltarInformacionCreacion(cedula:string){
  this.SapService.consultarUsario(cedula).subscribe(
    data => {
     if (data == "Error:usuario no encontrado")
        this.nombreCreador ="Empleado retirado : "   + cedula;
    else
      this.nombreCreador = data;
     
     console.log(data);
    },
    error => {   
      console.log(error);     
    },
  )
}

mostrarInfoContrato(contrato:string){
  this.SapService.getContratoSAP(contrato).subscribe(
    data => {
    let info  = JSON.parse(data);     
     console.log(info);
     let cto : InfoContratoDTO = { Objeto: info.objeto, Proveedor :info.proveedor};
 
     this.openDialog(cto)
    },
    error => {   
      console.log(error);     
    },
  )
}

 openDialog(datos: InfoContratoDTO) {
  const dialogRef = this.dialog.open(DLGInfoContratoComponent,{data: datos}); 
  //dialogRef.setInfoContrato
}
 ngOnInit(): void {
    
  }


}

  
