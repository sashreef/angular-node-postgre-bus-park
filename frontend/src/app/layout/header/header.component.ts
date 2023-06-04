import { Component } from "@angular/core";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-header-component",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})

export class HeaderComponent {

    public isLoggedIn = false;
    constructor(private manageService: ManageService) { }

    public ngOnInit(): void {
        this.manageService.isLoggedIn$.pipe().subscribe((boolean) => {
            this.isLoggedIn = boolean;
        });
    }
}