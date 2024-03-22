
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from "@angular/common/http";
import { environment } from '../environments/environment';
import { Observable } from "rxjs/internal/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserDTO } from './dto/userDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _token: string;
  private helper = new JwtHelperService();
  private _solped="";
  private _nombre ="";
  cedula:string = "";
 
  public user: UserDTO = {
    Username: "",
    Password: ""
  }

 
  constructor(private htttp: HttpClient, private router: Router) { 
    this._token = "";

  }
getNombre(){
  return this._nombre;
}
  setSolped(solicitud:string){
    this._solped= solicitud;
  }

  getSolped(){
    return  this._solped;
  }
  loginuser(Username: string, Password: string): Observable<any> {

    const urlEndpoint = `${environment.apiUrl}/autenticar`;
    this.cedula= Username;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const params = new URLSearchParams();
  
    params.set('Username', Username);
    params.set('Password', Password);
    return this.htttp.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  isLoggedIn(): boolean {
    
    const token = this._token;
    // Aquí puedes implementar la lógica para verificar la autenticación
    // Por simplicidad, aquí solo se verifica si el token existe
    return token !== "";
  }
  
  guardarToken(accessToken: string): void {
    this._token = accessToken;
    
    let DatosToken=  this.helper.decodeToken(accessToken);

    if(DatosToken.unique_name.toString( ).includes("Error"))
    {
      alert(DatosToken.unique_name);
      return;

    }
    localStorage.setItem('token', this._token);
    localStorage.setItem('Nombres', DatosToken.unique_name);
    this._nombre = DatosToken.unique_name;
    this.router.navigate(["/home"]);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }
}
