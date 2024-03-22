import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from "@angular/common/http";
import { environment } from '../environments/environment';
import { Observable } from "rxjs/internal/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { motivoRechazoDTO } from './dto/motivoRechazoDTO';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class SapServiceService {
  motivosLis = new Array<motivoRechazoDTO>();
  nombreCreador:string ="";
  fechaCreacion:string="";
  constructor(private htttp: HttpClient, public servUsur: LoginService, private router: Router) { }
  private urlEndpoint = `${environment.apiUrl}`;

  private _estado:boolean = false;
  getStateProcess()
  {
return this._estado;

  }

setStateProcess(est:boolean)
  {
this._estado = est;

  }

  getSolpedSAP(solped: string): Observable<any> {

    const apimethod = this.urlEndpoint + '/getSolped?solped='+solped;
 
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    return this.htttp.get<any>(apimethod, { headers: httpHeaders });
  }

  consultarUsario(cedula: string){

    const apimethod = this.urlEndpoint + '/consultarNombreEmpleado?usuario='+this.servUsur.user.Username + '&password='  +this.servUsur.user.Password + '&cedulabuscar='+  cedula;
 
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    return this.htttp.post<any>(apimethod, { headers: httpHeaders });
  }

  getContratoSAP(contrato: string): Observable<any> {

    const apimethod = this.urlEndpoint + '/getContrato';
 
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
   
    return this.htttp.post<any>(apimethod + "?numero=" +contrato, "", { headers: httpHeaders });
  }

  ObtenerMotivosRechazo(): Observable<any> {

    const apimethod = this.urlEndpoint + '/ObtenerMotivosRechazo';
 
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
  
    return this.htttp.post<any>(apimethod, { headers: httpHeaders });
  }

  aprobarSAP(solped: string, cedula : string): Observable<any> {

    const apimethod = this.urlEndpoint + '/aprobar?solped=' +solped + '&ceudula='+ cedula;
 
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });  
    return this.htttp.post<any>(apimethod,  { headers: httpHeaders });
  }

  rechazarSAP(solped: string, motivo:string,  detallemotivo: string, cedula : string): Observable<any> {

    const apimethod = this.urlEndpoint + '/rechazar?solped='+ cedula +'&motivo=' +motivo +'&detallemotivo=' +detallemotivo + '&cedula='+ cedula;
 
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const params = new URLSearchParams();
      
    return this.htttp.post<any>(apimethod,  { headers: httpHeaders });
  }

  rechazarSolicitud(idmotivo:string, motivo:string)
  {
    let sol = this.servUsur.getSolped();
    this.rechazarSAP(sol,idmotivo, motivo , this.servUsur.cedula).subscribe(
      data => {
        this.setStateProcess(false);
      var info  = JSON.parse(data) ;  
      for(let i = 0; i < info.length; i++)
      {
        if(info[i].MsgType == 'E')
        {
        
          alert(info[i].Line)
          return;
        }
      }
      this.router.navigate(["/login"]);
      },
      error => {   
        this.setStateProcess(false);
        console.log(error);     
      },
    ) 

  }

aprobar(){
  let sol = this.servUsur.getSolped();
  this.aprobarSAP(sol, this.servUsur.cedula).subscribe(
    data => {
      this.setStateProcess(false);
    var info  = JSON.parse(data) ;  
    for(let i = 0; i < info.length; i++)
    {
      if(info[i].MsgType == 'E')
      {
        alert(info[i].Line)
        return;
      }
    }
    this.router.navigate(["/login"]);
    },
    error => {   
      this.setStateProcess(false);
      console.log(error);     
    },
  ) 

}

  llenarMotivos(){
    this.ObtenerMotivosRechazo().subscribe(
      data => {
      var info  = JSON.parse(data) ;  

      for (let i = 0; i< info.length; i ++)
      {
          let motivoTMP: motivoRechazoDTO = {
           idMotivo :info[i].Tipocom ,
           motivo : info[i].Detalle
        }
       
        this.motivosLis.push( motivoTMP );
      }
      //alert("lenar los motivos");
      },
      error => {   
        console.log(error);     
      },
    )
  

  }

}
