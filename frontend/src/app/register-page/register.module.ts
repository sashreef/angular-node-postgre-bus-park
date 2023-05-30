import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ServicesModule } from "../services/services.module";
import { RegisterComponent } from "./register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing/app-routing";



@NgModule({
    exports: [
        RegisterComponent,
    ],
    declarations: [
        RegisterComponent,
    ],
    imports: [
        SharedModule,
        ServicesModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        AppRoutingModule
    ],
})

export class RegisterModule { }