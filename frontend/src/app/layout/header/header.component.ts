import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-header-component",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})

export class HeaderComponent {

    public isLoggedIn = false;
    private unsubscribe$$: Subject<void> = new Subject();
    constructor(private manageService: ManageService) { }

    public ngOnInit(): void {
        this.manageService._isLoggedIn$.pipe(takeUntil(this.unsubscribe$$)).subscribe((boolean) => {
            this.isLoggedIn = boolean;
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }
}