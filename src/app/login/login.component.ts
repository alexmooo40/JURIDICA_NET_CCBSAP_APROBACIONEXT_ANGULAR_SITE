import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDTO } from "../dto/userDTO";
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public user: UserDTO = {
    Username: "",
    Password: ""
  }
  public mensaje: string = "";
  public showloadin: boolean = false;
  public key:string = "";

  constructor(private router:Router, private srvUser:LoginService, private querystr: ActivatedRoute) {
    this.querystr.queryParamMap.subscribe(params => {
        
      if (params.get('solped') != "" &&  params.get('solped') != null ) {
        let para = params.get('solped')?.toString();
        if (para == undefined || para == null)
         para = "";
        this.srvUser.setSolped(para);
      }
    });

   }

  ngOnInit() :void {
   
  }
  onLogin() {
    if (this.user.Username == "") {
      this.mensaje = "Indique el usuario";
      return;
    }
    if (this.user.Password == "") {


      this.mensaje = "Indique la contraseña";
      return;
    }
    this.showloadin = true;
    return this.srvUser.loginuser(this.user.Username, this.user.Password).subscribe(
        data => {
          this.srvUser.guardarToken(data);
          this.showloadin = false;      
          this.srvUser.user = this.user;    
        },
        error => {
       
          console.log(error);
          this.mensaje = error.error.ExceptionMessage;
          this.showloadin = false;
          alert("Usuario y / o contraseña inválidos")
        },
      )
  }
    
  }

