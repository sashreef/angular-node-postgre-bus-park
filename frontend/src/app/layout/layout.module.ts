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
import { AddUserFormComponent } from "./user-page/add-user-form/add-user-form.component";
import { TripsTableComponent } from "./user-page/trips-component/trips-table.component";
import { TripsFormComponent } from "./user-page/trips-component/trips-form/trips-form.component";


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
        AddUserFormComponent,
        TripsTableComponent,
        TripsFormComponent

    ],
    declarations: [
        MainComponent,
        UserComponent,
        LayoutComponent,
        HeaderComponent,
        AddUserFormComponent,
        TripsTableComponent,
        TripsFormComponent
    ]
})

export class LayoutModule { }