import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subject, take, takeUntil } from "rxjs";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-header-component",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})

export class HeaderComponent {

    public pending = false;
    public isLoggedIn = false;
    private unsubscribe$$: Subject<void> = new Subject();
    constructor(
        private manageService: ManageService,
        private cookieService: CookieService,
        private router: Router
        ) { }
    

    public ngOnInit(): void {
        this.pending = true;
        const token = this.cookieService.get("accesstoken");
         if(!!token) {
            this.manageService.refresh(token).pipe(take(1)).subscribe(() => {
                this.isLoggedIn = true;
                this.manageService._isLoggedIn$.next(true);
                this.manageService.isLoggedIn = true;
                this.pending = false;
            });
         }
        this.manageService._isLoggedIn$.pipe(takeUntil(this.unsubscribe$$)).subscribe((boolean) => {
            this.isLoggedIn = boolean;
        });
    }

    public logout(): void {
        this.manageService.logout().pipe(take(1)).subscribe(() => {
            this.isLoggedIn = false;
            this.manageService._isLoggedIn$.next(false);
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }
}