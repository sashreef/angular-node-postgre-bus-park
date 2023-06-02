import { NgModule } from "@angular/core";
import { MainComponent } from "./main-page/main.component";
import { CommonModule } from "@angular/common";


@NgModule({
    imports: [
        CommonModule
    ],exports: [
        MainComponent,
    ],
    declarations: [
        MainComponent,
    ]
})

export class LayoutModule { }