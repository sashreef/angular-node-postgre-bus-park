import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { AuthInterceptor } from './core.module/interceptors/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { RegisterModule } from './register-page/register.module';
import { LoginModule } from './login-page/login.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LoginModule,
    RegisterModule,
    LayoutModule,
    HttpClientModule,
    SharedModule,
    ServicesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
