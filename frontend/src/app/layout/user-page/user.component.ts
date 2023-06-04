import { Component } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { Subject, combineLatest, delay, take, takeUntil } from "rxjs";
import { ListItem } from "src/app/core.module/utils/template";
import { BookTicket, Register } from "src/app/interfaces/core.interfaces";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.css"]
})

export class UserComponent {
    public userForm: UntypedFormGroup;
    public pending = false;
    public USER_REGEX = /^[A-z0-9-_]{4,23}/;
    public PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    public PHONE_REGEX = /^(\+\d{2})\(?(\d{3})\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    public FULLNAME_REGEX = /^[A-Za-z-\s]{10,50}$/;
    

    private unsubscribe$$: Subject<void> = new Subject();
    
    constructor (
        private manageService: ManageService,   
        private formBuilder: UntypedFormBuilder,
        private cookieService: CookieService
    ) {
        this.userForm = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            new_password: new FormControl(null, Validators.required),
            confirm_password: new FormControl(null, Validators.required),
            fullName: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
        });
      
    }
    public changeUserData(data: Register): void {
        if(this.userForm.invalid) {
            throw "Not all fields are full";
        }
        this.manageService.register(data).pipe(take(1)).subscribe((data) => {
            console.log(data);
        },
        (err) => {
            console.log(err);
        });
    }
    public isValidForm(): boolean {
        const fullName = this.userForm.controls['fullName'].value;
        const phone = this.userForm.controls['phone'].value;
        const password = this.userForm.controls['password'].value;
        const confirmPassword = this.userForm.controls['confirm_password'].value;
        const new_password = this.userForm.controls['new_password'].value;
        const isFullNameValid = this.FULLNAME_REGEX.test(fullName);
        const isPhoneValid = this.PHONE_REGEX.test(phone);
        const isConfirmPasswordValid = password === confirmPassword;
      
        return (
          isFullNameValid &&
          isPhoneValid &&
          isConfirmPasswordValid &&
          fullName.length > 0 &&
          phone.length > 0 &&
          password.length > 0 
        );
      }



    }
