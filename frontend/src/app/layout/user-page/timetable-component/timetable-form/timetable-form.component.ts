import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-timetables-form",
    templateUrl: "./timetable-form.component.html",
    styleUrls: ["./timetable-form.component.css"]
})

export class TimetablesFormComponent {
    @Input() form?: UntypedFormGroup;
    @Input() mode?: "create" | "edit";
    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor(private manageService: ManageService) { }

    public update(formValue: any): void {
        this.manageService.updateTimetable(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public add(formValue: any): void {
        this.manageService.addTimetable(formValue).pipe(take(1)).subscribe(() => {
            this.close();
        });
    }

    public close() {
        this.closeEmitter.emit();
    }
}