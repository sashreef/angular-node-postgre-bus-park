import { NgModule } from "@angular/core";
import { LoginComponent } from "./auth-page/login/login.component";
import { RegisterComponent } from "./auth-page/register-page/register.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ServicesModule } from "../services/services.module";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    exports: [
        LoginComponent,
        RegisterComponent,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        HttpClientModule,
        SharedModule,
        ServicesModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})

export class LayoutModule { }