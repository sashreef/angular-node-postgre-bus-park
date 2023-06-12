import { Component, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subject, take, takeUntil } from "rxjs";
import { Bus } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";
import { ManageService } from "src/app/services/manage.service";


@Component({
    selector: "app-bus-table",
    templateUrl: "./bus-table.component.html",
    styleUrls: ["./bus-table.component.css"]
})

export class BusesTableComponent {
    @Input() buses?: Bus[];
    public mode: "view" | "create" | "edit" = "view";
    public filteredBuses: Bus[] = [];
    public activeBuses: Bus | null = null;
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
        this.filteredBuses = this.buses || [];
        this.setSearchSub();
        
    }

    public selectBus(bus: Bus): void {
        this.activeBuses = bus;
        
    }

    public deleteBus(id: number): void {
        this.manageService.deleteBus(id).pipe(take(1)).subscribe(() => {
            const indexFiltered = this.filteredBuses.findIndex((bus)=>bus.bus_id === id);
            if(indexFiltered !== -1)
            {
                this.filteredBuses.splice(indexFiltered, 1);
            }
            const index = this.buses?.findIndex((bus)=>bus.bus_id === id);
            if(index !== -1 && index)
            {
                this.buses?.splice(index, 1);
            }
        }, 
        (err) => {
            throw err;
        })
    }

    public updateBus(bus: Bus): void {
        this.form = this.formBuilderService.getBusFormGroup(bus);
        this.mode = "edit";
    }

    public addBus(): void {
        this.form = this.formBuilderService.getBusFormGroup(undefined, true);
        this.mode = "create";
    }

    public closeForm(): void {
        this.mode = "view";
        this.form = null;
        this.getAllBuses();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
      }

    private setSearchSub(): void {
        this.searchForm.controls["search"]?.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((id) => {
          if (!id) {
            this.filteredBuses = this.buses || [];
            return;
          }
          this.filteredBuses = this.buses?.filter((bus) => bus.bus_id.toString().includes(id)) || [];
        });
    }
    
    private getAllBuses(): void {
        this.manageService.getAllBuses().pipe(take(1)).subscribe((data: Bus[]) => {
            this.buses = data;
            this.filteredBuses = data;
          });
    }
}