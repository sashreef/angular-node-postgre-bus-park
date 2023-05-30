import { Component } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { take } from "rxjs";
import { Register } from "src/app/interfaces/core.interfaces";
import { ManageService } from "src/app/services/manage.service";


 @Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
 
export class RegisterComponent { 

    public errorMessage?: string;
    public registerForm: UntypedFormGroup;
    public pending = false;
    public isFocused: boolean = false;
    public USER_REGEX = /^[A-z0-9-_]{4,23}/;
    public PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    public PHONE_REGEX = /^(\+\d{2})\(?(\d{3})\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    public FULLNAME_REGEX = /^[A-Za-z-\s]{10,50}$/;

    constructor (
        private manageService: ManageService,
        private formBuilder: UntypedFormBuilder,
        private router: Router
    ) {
        this.registerForm = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            confirm_password: new FormControl(null, Validators.required),
            fullName: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),

        });
    }

    public register(data: Register): void {
        if(this.registerForm.invalid) {
            throw "Not all fields are full";
        }
        this.manageService.register(data).pipe(take(1)).subscribe((data) => {
            console.log(data);
        },
        (err) => {
            console.log(err);
        });
    }

    public signIn(): void {
        // this.router.navigate()
    }

    public isValidForm(): boolean {
        const username = this.registerForm.controls['username'].value;
        const fullName = this.registerForm.controls['fullName'].value;
        const phone = this.registerForm.controls['phone'].value;
        const password = this.registerForm.controls['password'].value;
        const confirmPassword = this.registerForm.controls['confirm_password'].value;
      
        const isUsernameValid = this.USER_REGEX.test(username);
        const isFullNameValid = this.FULLNAME_REGEX.test(fullName);
        const isPhoneValid = this.PHONE_REGEX.test(phone);
        const isPasswordValid = this.PWD_REGEX.test(password);
        const isConfirmPasswordValid = password === confirmPassword;
      
        return (
          isUsernameValid &&
          isFullNameValid &&
          isPhoneValid &&
          isPasswordValid &&
          isConfirmPasswordValid &&
          username.length > 0 &&
          fullName.length > 0 &&
          phone.length > 0 &&
          password.length > 0 &&
          confirmPassword.length > 0
        );
      }
}