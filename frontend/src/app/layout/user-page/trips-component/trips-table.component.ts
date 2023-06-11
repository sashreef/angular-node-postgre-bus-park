import { Component, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Trip } from "src/app/interfaces/core.interfaces";
import { ManageService } from "src/app/services/manage.service";


@Component({
    selector: "app-trips-table",
    templateUrl: "./trips-table.component.html",
    styleUrls: ["./trips-table.component.css"]
})

export class TripsTableComponent {
    @Input() trips?: Trip[];
    public mode: "view" | "create" | "edit" = "view";
    public filteredTrips: Trip[] = [];
    public activeTrip: Trip | null = null;
    public searchForm: UntypedFormGroup

    constructor(
        private manageService: ManageService,
        private formBuilder: UntypedFormBuilder
        ) {
        this.searchForm = this.formBuilder.group({
            search: null
        })
    }

    public selectTrip(trip: Trip) {
        this.activeTrip = trip;
    }
}