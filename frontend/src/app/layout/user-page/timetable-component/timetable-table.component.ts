import { Component, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subject, take, takeUntil } from "rxjs";
import { Timetable } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";
import { ManageService } from "src/app/services/manage.service";


@Component({
    selector: "app-timetables-table",
    templateUrl: "./timetable-table.component.html",
    styleUrls: ["./timetable-table.component.css"]
})

export class TimetablesTableComponent {
    @Input() timetables?: Timetable[];
    public mode: "view" | "create" | "edit" = "view";
    public filteredTimetables: Timetable[] = [];
    public activeTimetable: Timetable | null = null;
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
        this.filteredTimetables = this.timetables || [];
        this.setSearchSub();
    }

    public selectTimetable(timetable: Timetable): void {
        this.activeTimetable = timetable;
    }

    
    public updateTimetable(timetable:Timetable): void {
        this.form = this.formBuilderService.getTimetableFormGroup(timetable);
        this.mode = "edit";
    }

    public addTimetable(): void {
        this.form = this.formBuilderService.getTimetableFormGroup(undefined, true);
        this.mode = "create";
    }

    public closeForm(): void {
        this.mode = "view";
        this.form = null;
        this.getAllTimetables();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
      }

    private setSearchSub(): void {
        this.searchForm.controls["search"]?.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((id) => {
          if (!id) {
            this.filteredTimetables = this.timetables || [];
            return;
          }
          this.filteredTimetables = this.timetables?.filter((timetable) => timetable.timetable_id.toString().includes(id)) || [];
        });
      }

    private getAllTimetables(): void {
        this.manageService.getAllTimetables().pipe(take(1)).subscribe((data: Timetable[]) => {
            this.timetables = data;
            this.filteredTimetables = data;
          });
    }
}