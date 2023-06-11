import { Component, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subject, take, takeUntil } from "rxjs";
import { Trip } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";
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
    public searchForm: UntypedFormGroup;
    public form: UntypedFormGroup | null = null;
    

    private unsubscribe$$: Subject<void> = new Subject();

    constructor(
        private manageService: ManageService,
        private formBuilder: UntypedFormBuilder,
        private formBuilderService: FormBuilderService
        ) {
        this.searchForm = this.formBuilder.group({
            search: null
        })
    }

    public ngOnInit(): void {
        this.filteredTrips = this.trips || [];
        this.setSearchSub();
    }

    public selectTrip(trip: Trip): void {
        this.activeTrip = trip;
    }

    public deleteTrip(id: number): void {
        this.manageService.deleteTrip(id).pipe(take(1)).subscribe(() => {
        }, 
        (err) => {
            throw err;
        })
    }

    public updateTrip(trip: Trip): void {
        this.form = this.formBuilderService.getTripFormGroup(trip);
        this.mode = "edit";
    }

    public addTrip(): void {
        this.form = this.formBuilderService.getTripFormGroup(undefined, true);
        this.mode = "create";
    }

    public closeForm(): void {
        this.mode = "view";
        this.form = null;
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
      }

    private setSearchSub(): void {
        this.searchForm.controls["search"]?.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((id) => {
          if (!id) {
            this.filteredTrips = this.trips || [];
            return;
          }
          this.filteredTrips = this.trips?.filter((trip) => trip.trip_id.toString().includes(id)) || [];
        });
      }
}