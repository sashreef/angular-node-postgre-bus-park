import { NgModule } from "@angular/core";
import { MainComponent } from "./main-page/main.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ],exports: [
        MainComponent,
    ],
    declarations: [
        MainComponent,
    ]
})

export class LayoutModule { }