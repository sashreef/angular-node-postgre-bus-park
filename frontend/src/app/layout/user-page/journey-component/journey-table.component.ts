import { Component, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subject, take, takeUntil } from "rxjs";
import { Journey } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";
import { ManageService } from "src/app/services/manage.service";
import { NotificationService } from "src/app/services/notification.service";


@Component({
    selector: "app-journeys-table",
    templateUrl: "./journey-table.component.html",
    styleUrls: ["./journey-table.component.css"]
})

export class JourneysTableComponent {
    @Input() journeys?: Journey[];
    public mode: "view" | "create" | "edit" = "view";
    public filteredJourneys: Journey[] = [];
    public activeJourney: Journey | null = null;
    public searchForm: UntypedFormGroup;
    public form: UntypedFormGroup | null = null;
    

    private unsubscribe$$: Subject<void> = new Subject();

    constructor(
        private manageService: ManageService,
        private formBuilder: UntypedFormBuilder,
        private formBuilderService: FormBuilderService,
        private _notificationSvc: NotificationService
        ) {
        this.searchForm = this.formBuilder.group({
            search: null
        })
    }

    public ngOnInit(): void {
        this.filteredJourneys = this.journeys || [];
        
        this.setSearchSub();
    }

    public selectJourney(journey: Journey): void {
        this.activeJourney = journey;
    }

    public deleteJourney(id: number): void {
        this.manageService.deleteJourney(id).pipe(take(1)).subscribe(() => {
            const indexFiltered = this.filteredJourneys.findIndex((journey)=>journey.journey_id === id);
            if(indexFiltered !== -1)
            {
                this.filteredJourneys.splice(indexFiltered, 1);
            }
            const index = this.journeys?.findIndex((journey)=>journey.journey_id === id);
            if(index !== -1 && index)
            {
                this.journeys?.splice(index, 1);
            }
            this._notificationSvc.success("Deleting success", "Journey deleted",3000);
        }, 
        (err) => {
            this._notificationSvc.error("Deleting failed", err.error.error,3000);
            throw err;
        });
    }

    public cancelJourney(id: number): void {
        this.manageService.cancelJourney(id).pipe(take(1)).subscribe(() => {
            this._notificationSvc.success("Cancel success", "Journey canceled",3000);
            this.getAllJourneys();
        }, 
        (err) => {
            this._notificationSvc.error("Cancel failed", err.error.error,3000);
            throw err;
        })
        
    }

    public updateJourney(journey: Journey): void {
        this.form = this.formBuilderService.getJourneyFormGroup(journey);
        this.mode = "edit";
    }

    public addJourney(): void {
        this.form = this.formBuilderService.getJourneyFormGroup(undefined, true);
        this.mode = "create";
    }

    public closeForm(): void {
        this.mode = "view";
        this.form = null;
        this.getAllJourneys();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
      }

    private setSearchSub(): void {
        this.searchForm.controls["search"]?.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((id) => {
          if (!id) {
            this.filteredJourneys = this.journeys || [];
            return;
          }
          this.filteredJourneys = this.journeys?.filter((journey) => journey.journey_id.toString().includes(id)) || [];
        });
      }

    private getAllJourneys(): void {
        this.manageService.getAllJourneys().pipe(take(1)).subscribe((data: Journey[]) => {
            this.journeys = data;
            this.filteredJourneys = data;
          });
    }
}