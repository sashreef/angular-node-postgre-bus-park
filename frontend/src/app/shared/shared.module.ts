import { NgModule } from "@angular/core";
import { TextBoxComponent } from "./text-box-component/text-box.component";

@NgModule({
    exports: [
        TextBoxComponent
    ],
    declarations: [
        TextBoxComponent
    ],
})

export class SharedModule { }