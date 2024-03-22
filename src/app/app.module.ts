import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { FormularioComponent } from './formulario/formulario.component';
import { MaterialModule } from './Material/Material.module';
import { HttpClientModule } from '@angular/common/http';
import { DLGInfoContratoComponent } from './dlg-info-contrato/dlg-info-contrato.component';
import { DlgMotivosRechazoComponent } from './dlg-motivos-rechazo/dlg-motivos-rechazo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'home', component:HomeComponent },
];
@NgModule({
  declarations: [						
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
      FooterComponent,
      FormComponent,
      FormularioComponent,
      DLGInfoContratoComponent,
      DlgMotivosRechazoComponent,
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
