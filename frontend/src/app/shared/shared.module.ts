import { NgModule } from "@angular/core";
import { TextBoxComponent } from "./text-box-component/text-box.component";
import { DateBoxComponent } from "./date-box-component/date-box-component";
import { CommonModule } from "@angular/common";
import { SelectBoxComponent } from "./select-box.component/select-box.component";
import { IconComponent } from "./icon/icon-component";
import { DropComponent } from "./drop/drop.component";

@NgModule({
    exports: [
        TextBoxComponent,
        DateBoxComponent,
        SelectBoxComponent,
        IconComponent,
        DropComponent
        
    ],
    declarations: [
        TextBoxComponent,
        DateBoxComponent,
        SelectBoxComponent,
        IconComponent,
        DropComponent,
    ],

    imports: [
        CommonModule
    ]
})

export class SharedModule { }