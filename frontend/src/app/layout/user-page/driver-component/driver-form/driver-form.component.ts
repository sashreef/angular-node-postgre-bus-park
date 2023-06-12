import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-drivers-form",
    templateUrl: "./driver-form.component.html",
    styleUrls: ["./driver-form.component.css"]
})

export class DriversFormComponent {
    @Input() form?: UntypedFormGroup;
    @Input() mode?: "create" | "edit";
    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor(private manageService: ManageService) { }

    public update(formValue: any): void {
        this.manageService.updateDriver(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public add(formValue: any): void {
        this.manageService.addDriver(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public close() {
        this.closeEmitter.emit();
    }
}