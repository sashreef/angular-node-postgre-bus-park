import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subject, take, takeUntil } from "rxjs";
import { UserInfo } from "src/app/interfaces/core.interfaces";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-header-component",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})

export class HeaderComponent {

    public pending = false;
    public isLoggedIn = false;
    public userInfo: UserInfo | null = null;
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
                this.pending = false;
            });
         }
        this.manageService._isLoggedIn$.pipe(takeUntil(this.unsubscribe$$)).subscribe((boolean) => {
            this.isLoggedIn = boolean;
        });
        this.manageService.userInfo$.pipe(takeUntil(this.unsubscribe$$)).subscribe((info) => {
            this.userInfo = info;
        })
    }

    public logout(): void {
        this.manageService.logout().pipe(take(1)).subscribe();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }
}