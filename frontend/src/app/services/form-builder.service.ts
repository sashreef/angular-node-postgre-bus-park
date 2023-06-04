import { Directive } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { userForm } from "../interfaces/core.interfaces";

@Directive()

export class FormBuilderService {
    constructor (
        private formBuilder: UntypedFormBuilder
    ) {
        
    }
    public getUserFormGroup(data:userForm): UntypedFormGroup {
        return this.formBuilder.group({
            username: new FormControl(data?.username || null, Validators.required),
            password: new FormControl(data?.username || null, Validators.required),
            new_password: new FormControl(data?.username || null, Validators.required),
            confirm_password: new FormControl(data?.username || null, Validators.required),
            fullName: new FormControl(data?.username || null, Validators.required),
            phone: new FormControl(data?.username || null, Validators.required),
        });
    }
}