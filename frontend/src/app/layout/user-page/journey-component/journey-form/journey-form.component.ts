import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
    selector: "app-journeys-form",
    templateUrl: "./journey-form.component.html",
    styleUrls: ["./journey-form.component.css"]
})

export class JourneysFormComponent {
    @Input() form?: UntypedFormGroup;
    @Input() mode?: "create" | "edit";
    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor(private manageService: ManageService, private _notificationSvc: NotificationService) { }

    public update(formValue: any): void {
        this.manageService.updateJourney(formValue).pipe(take(1)).subscribe(() => {
            this._notificationSvc.success("Editing success", "Data saved",3000);
            this.close();
        },(err) => {
            this._notificationSvc.error("Editing failed", err.error.error,3000);
        });
    }

    public add(formValue: any): void {
        this.manageService.addJourney(formValue).pipe(take(1)).subscribe(() => {
            this._notificationSvc.success("Adding success", "Data saved",3000);
            this.close();
        },(err) => {
            this._notificationSvc.error("Adding failed", err.error.error,3000);
            
        });
    }

    public close() {
        this.closeEmitter.emit();
    }

    public getDate(type : string) : string {
        const today = new Date().toISOString().split("T")[0];
        if(type === "min"){
            return today;
        }
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth.toISOString().split("T")[0];
    }
}