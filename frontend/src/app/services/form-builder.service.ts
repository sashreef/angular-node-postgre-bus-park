import { Directive } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Booking, userForm } from "../interfaces/core.interfaces";

@Directive()

export class FormBuilderService {
    constructor (
        private formBuilder: UntypedFormBuilder
    ) {
        
    }
    public getUserFormGroup(data:userForm): UntypedFormGroup {
        return this.formBuilder.group({
            username: new FormControl(data?.username || null, Validators.required),
            password: new FormControl(data?.password || null, Validators.required),
            new_password: new FormControl(data?.new_password || null, Validators.required),
            confirm_password: new FormControl(data?.confirm_password || null, Validators.required),
            fullName: new FormControl(data?.fullName || null, Validators.required),
            phone: new FormControl(data?.phone || null, Validators.required),
        }); 
    }
    public getAdminUserFormGroup(data:userForm): UntypedFormGroup {
        return this.formBuilder.group({
            username: new FormControl(data?.username || null, Validators.required),
            new_password: new FormControl(data?.new_password || null, Validators.required),
            confirm_password: new FormControl(data?.confirm_password || null, Validators.required),
            fullName: new FormControl(data?.fullName || null, Validators.required),
            phone: new FormControl(data?.phone || null, Validators.required),
        }); 
    }
    
}