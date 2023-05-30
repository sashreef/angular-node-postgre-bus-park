import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { SharedModule } from "../shared/shared.module";
import { ServicesModule } from "../services/services.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";



@NgModule({
    exports: [
        LoginComponent,
    ],
    declarations: [
        LoginComponent,
    ],
    imports: [
        SharedModule,
        ServicesModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
})

export class LoginModule { }