import { NgModule } from "@angular/core";
import { TextBoxComponent } from "./text-box-component/text-box.component";
import { CommonBoxValueAccessor } from "./value-accessor/common-box-value-accessor";


@NgModule({
    exports: [
        TextBoxComponent
    ],
    declarations: [
        TextBoxComponent
    ],
})

export class SharedModule { }