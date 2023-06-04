import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { RegisterModule } from './register-page/register.module';
import { LoginModule } from './login-page/login.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LoginModule,
    RegisterModule,
    LayoutModule,
    SharedModule,
    ServicesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
