import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { take } from "rxjs";
import { ManageService } from "src/app/services/manage.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
    selector: "app-add-user-form",
    templateUrl: "./add-user-form.component.html",
    styleUrls: ["./add-user-form.component.css"]
  })

export class AddUserFormComponent {
    @Input() form?: UntypedFormGroup;
    @Input() mode?: "create" | "edit";
    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();

    public selectValue: string;
    public selectData = [[ "administrator", "Administrator"], ["cashier", "Cashier"], ["client", "Client"]]

    constructor(private manageService: ManageService,private _notificationSvc: NotificationService) {
        this.selectValue = this.selectData.find((data) => data[0] === this.form?.controls['role'].value)?.[0] || "client";
     }



    public addUser(formValue: any): void {
        // if(this.form?.invalid) {
        //     throw "Not all fields are full";
        // }
        this.manageService.signUpUserForAdmin(formValue).pipe(take(1)).subscribe(() => {
            this._notificationSvc.success("Adding success", "User added",3000);
            this.closeEmitter.emit();
        },
        (err) => {            
            this._notificationSvc.error("Adding failed", err.error.error,3000);
            
            console.log("bebraef");
            // throw err;
        });
    }

    public updateUser(formValue: any) {
        this.manageService.updateUserForAdmin(formValue).pipe(take(1)).subscribe(() => {
            this._notificationSvc.success("Editing success", "Data saved",3000);
            this.closeEmitter.emit();
        },
        (err) => {
            this._notificationSvc.error("Editing failed", err.error.error,3000);
            
            // throw err;
        });
    }

    public isValidform(): boolean {
            // const USER_REGEX = /^[A-z0-9-_]{4,23}/;
            // const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
            // const PHONE_REGEX = /^(\+\d{2})\(?(\d{3})\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
            // const FULLNAME_REGEX = /^[A-Za-z-\s]{10,50}$/;

            // const fullName = this.form?.controls['fullName'].value;
            // const phone = this.form?.controls['phone'].value;
            // const password = this.form?.controls['password'].value;
            // // const confirmPassword = this.form?.controls['confirm_password'].value;
            // const isFullNameValid = FULLNAME_REGEX.test(fullName);
            // const isPhoneValid = PHONE_REGEX.test(phone);
            
            //   if (isFullNameValid && isPhoneValid && fullName && phone && password) {
            //     // Выполнить проверки только если все поля заполнены
            //       return true;
            // }
            // return false; // Если условия не выполнены, вернуть false
        // РАЗОБРАТЬСЯ ЧТО ТУТ ПРОИСХОДИТ
        return true;
      }

      public close() {
        this.closeEmitter.emit();
      }
}