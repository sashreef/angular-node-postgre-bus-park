import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";


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

    constructor(private manageService: ManageService) { }


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
        this.manageService.busInTrip(this.popupOptions?.options.bus_number, this.form?.value.start_date, this.form?.value.end_date)
        .pipe(take(1)).subscribe((calcResult) => {
            this.result = calcResult;
        });
    }

    private sumTicketsOnTrip(): void {
        this.manageService.sumTicketsOnTrip(this.popupOptions?.options.trip_number, this.form?.value.start_date, this.form?.value.end_date)
        .pipe(take(1)).subscribe((calcResult) => {
            this.result = calcResult.total_tickets_sold;
        });
    }

    private difBookedAndPaid(): void {
        this.manageService.difBookedAndPaid(this.popupOptions?.options.trip_number, this.form?.value.start_date, this.form?.value.end_date)
        .pipe(take(1)).subscribe((calcResult) => {
            this.result = calcResult.ticket_difference;
        });
    }
}