import { Component, Input } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Bus, Trip } from "src/app/interfaces/core.interfaces";


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
    constructor() {

    }

    public selectTrip(trip: Trip): void {
        this.activeTrip = trip;
    }

    public selectBus(bus: Bus): void {
        this.activeBus = bus;
    }

}