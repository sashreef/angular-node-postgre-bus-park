import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-buses-form",
    templateUrl: "./bus-form.component.html",
    styleUrls: ["./bus-form.component.css"]
})

export class BusesFormComponent {
    @Input() form?: UntypedFormGroup;
    @Input() mode?: "create" | "edit";
    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor(private manageService: ManageService) { }

    public update(formValue: any): void {
        this.manageService.updateBus(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public add(formValue: any): void {
        this.manageService.addBus(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public close() {
        this.closeEmitter.emit();
    }
}