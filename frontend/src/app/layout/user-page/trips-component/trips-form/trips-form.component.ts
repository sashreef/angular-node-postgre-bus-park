import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-trips-form",
    templateUrl: "./trips-form.component.html",
    styleUrls: ["./trips-form.component.css"]
})

export class TripsFormComponent {
    @Input() form?: UntypedFormGroup;
    @Input() mode?: "create" | "edit";
    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor(private manageService: ManageService) { }

    public update(formValue: any): void {
        this.manageService.updateTrip(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public add(formValue: any): void {
        this.manageService.addTrip(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public close() {
        this.closeEmitter.emit();
    }
}