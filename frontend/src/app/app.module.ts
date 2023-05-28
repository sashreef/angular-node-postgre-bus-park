import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { AuthInterceptor } from './core.module/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    ServicesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
