import { NgModule } from "@angular/core";
import { MainComponent } from "./main-page/main.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],exports: [
        MainComponent,
    ],
    declarations: [
        MainComponent,
    ]
})

export class LayoutModule { }