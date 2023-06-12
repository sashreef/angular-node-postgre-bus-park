import { Component, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subject, take, takeUntil } from "rxjs";
import { Driver } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";
import { ManageService } from "src/app/services/manage.service";


@Component({
    selector: "app-drivers-table",
    templateUrl: "./driver-table.component.html",
    styleUrls: ["./driver-table.component.css"]
})

export class DriversTableComponent {
    @Input() drivers?: Driver[];
    public mode: "view" | "create" | "edit" = "view";
    public filteredDrivers: Driver[] = [];
    public activeDriver: Driver | null = null;
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
        this.filteredDrivers = this.drivers || [];
        this.setSearchSub();
    }

    public selectDriver(driver: Driver): void {
        this.activeDriver = driver;
    }

    public deleteDriver(id: number): void {
        this.manageService.deleteDriver(id).pipe(take(1)).subscribe(() => {
            const indexFiltered = this.filteredDrivers.findIndex((driver)=>driver.driver_id === id);
            if(indexFiltered !== -1)
            {
                this.filteredDrivers.splice(indexFiltered, 1);
            }
            const index = this.drivers?.findIndex((driver)=>driver.driver_id === id);
            if(index !== -1 && index)
            {
                this.drivers?.splice(index, 1);
            }
        }, 
        (err) => {
            throw err;
        })
    }

    public updateDriver(driver: Driver): void {
        this.form = this.formBuilderService.getDriverFormGroup(driver);
        this.mode = "edit";
    }

    public addDriver(): void {
        this.form = this.formBuilderService.getDriverFormGroup(undefined, true);
        this.mode = "create";
    }

    public closeForm(): void {
        this.mode = "view";
        this.form = null;
        this.getAllDrivers();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
      }

    private setSearchSub(): void {
        this.searchForm.controls["search"]?.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((id) => {
          if (!id) {
            this.filteredDrivers = this.drivers || [];
            return;
          }
          this.filteredDrivers = this.drivers?.filter((driver) => driver.driver_id?.toString().includes(id)) || [];
        });
      }
    private getAllDrivers(): void {
        this.manageService.getAllDrivers().pipe(take(1)).subscribe((data: Driver[]) => {
            this.drivers = data;
            this.filteredDrivers = data;
          });
    }
}