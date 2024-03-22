import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor( private router: Router, private srvUser:LoginService) {

   
   }

  
  ngOnInit() {
    if (!this.srvUser.isLoggedIn() ) {
      // Si no está autenticado, redirige a la página de inicio de sesión
      
      this.router.navigate(['/login']);
    }else{
      let para= this.srvUser.getSolped();
      if(para == "")
      {
        alert("Falta un parámetro para continuar");
        this.router.navigate(['/login']);
      }

    }
  }

}
