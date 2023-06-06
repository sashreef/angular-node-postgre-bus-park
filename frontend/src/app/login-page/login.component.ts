import { Component } from "@angular/core";
import { Login } from "../interfaces/core.interfaces";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "../services/manage.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent {
    // public errorMessage?: string;
    public loginForm: UntypedFormGroup;
    public pending = false;
    
    constructor (
        private manageService: ManageService,
        private formBuilder: UntypedFormBuilder,
        private cookieService: CookieService,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });

        
    }

    public ngOnInit(): void {
        this.pending = true;
        const token = this.cookieService.get("accesstoken");
         if(!!token) {
            this.manageService.refresh(token).pipe(take(1)).subscribe(() => {
                this.pending = false;
            });
         }
    }

    public login(data: Login): void {
        if(this.loginForm.invalid) {
            throw "Не заполнены обязательные поля"
        }
        this.manageService.login(data).pipe(take(1)).subscribe((data) => {
            this.router.navigate(["/main"]);
        },
        (err) => {
            console.log(err)
        });
    }
    }
