import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Bus, Trip } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";


@Component({
    selector: "app-statistics-table",
    templateUrl: "./statistics-table.component.html",
    styleUrls: ["./statistics-table.component.css"]
})

export class StatisticsTableComponent {
    @Input() trips?: Trip[];
    @Input() buses?: Bus[];
    public mode: "view" | "create" | "edit" = "view";
    public filteredTrips: Trip[] = [];
    public activeTrip: Trip | null = null;
    public activeBus: Bus | null = null;
    public form: UntypedFormGroup | null = null;
    public isPopupOpened = false;
    public popupOptions?: {type: string, options: any};

    constructor(
       private formBuilderService: FormBuilderService
    ) { }

    public selectTrip(trip: Trip): void {
        this.activeTrip = trip;
    }

    public selectBus(bus: Bus): void {
        this.activeBus = bus;
    }

    public openTripCalcPopup(trip: Trip, type: string): void {
        this.popupOptions = {
            type: type,
            options: {trip_number: trip.trip_number}
        };
        this.form = this.formBuilderService.getBusCalcForm();
        this.isPopupOpened = true;
    }

    public openBusCalcPopup(bus: Bus): void {
        this.popupOptions = {
            type: "busCalc",
            options: { bus_number: bus.bus_number }
        };
        this.form = this.formBuilderService.getBusCalcForm();
        this.isPopupOpened = true;
    }

    public closePopup(): void {
        this.isPopupOpened = false;
        this.popupOptions = undefined;
        this.form = null;
    }

}