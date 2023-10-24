import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";
import { NotificationService } from "src/app/services/notification.service";


@Component({
    selector: "app-statistics-popup",
    templateUrl: "./statistics-popup.component.html",
    styleUrls: ["./statistics-popup.component.css"]
})

export class StatisticsPopupComponent {
    @Input() form?: UntypedFormGroup;
    @Input() mode?: "create" | "edit";
    @Input() popupOptions?: {type:string, options: any};
    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();
    
    public result?: string; 
    

    constructor(private manageService: ManageService,
        private _notificationSvc: NotificationService) { }


    public calculate(): void {
        switch(this.popupOptions?.type) {
            case "busCalc": {
                this.calcBuses();
                break;
            }
            case "sum": {
                this.sumTicketsOnTrip();
                break;
            }
            case "paid": {
                this.difBookedAndPaid();
                break;
            }
        }
    }

    public close(): void {
        this.closeEmitter.emit();
    }

    private calcBuses(): void {
        this.result = "";
        this.manageService.busInTrip(this.popupOptions?.options.bus_number, this.form?.value.start_date, this.form?.value.end_date)
        .pipe(take(1)).subscribe((calcResult) => {
            if (calcResult.total_duration === null)
            {
                console.log("bebra");
                
                this.result = 0 + ' hours ' + 0 + ' minutes';
            }
            this.result = calcResult.total_duration.hours + ' hours ' + calcResult.total_duration.minutes + ' minutes';
        },(err) => {
            this._notificationSvc.error("Statistics error", err.error.error,3000);
            throw err;
        });
    }

    private sumTicketsOnTrip(): void {
        this.result = "";
        this.manageService.sumTicketsOnTrip(this.popupOptions?.options.trip_number, this.form?.value.start_date, this.form?.value.end_date)
        .pipe(take(1)).subscribe((calcResult) => {
            this.result = calcResult.total_tickets_sold;
        },(err) => {
            this._notificationSvc.error("Statistics error", err.error,3000);
            throw err;
        });
    }

    private difBookedAndPaid(): void {
        this.result = "";
        this.manageService.difBookedAndPaid(this.popupOptions?.options.trip_number, this.form?.value.start_date, this.form?.value.end_date)
        .pipe(take(1)).subscribe((calcResult) => {
            this.result = calcResult.ticket_difference;
        },(err) => {
            this._notificationSvc.error("Statistics error", err.error,3000);
            throw err;
        });
    }
}