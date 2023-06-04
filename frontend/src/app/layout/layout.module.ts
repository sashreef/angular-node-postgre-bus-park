import { NgModule } from "@angular/core";
import { MainComponent } from "./main-page/main.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing/app-routing";
import { RouterModule } from "@angular/router";
import { UserComponent } from "./user-page/user.component";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule
    ],
    exports: [
        MainComponent,
        UserComponent,
        LayoutComponent,
        HeaderComponent,
    ],
    declarations: [
        MainComponent,
        UserComponent,
        LayoutComponent,
        HeaderComponent
    ]
})

export class LayoutModule { }