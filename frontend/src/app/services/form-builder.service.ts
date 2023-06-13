import { Directive } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Booking, Bus, Driver, Journey, Timetable, Trip, userForm } from "../interfaces/core.interfaces";

@Directive()

export class FormBuilderService {
    constructor (
        private formBuilder: UntypedFormBuilder
    ) {
        
    }

    public getBookTicketGroup(): UntypedFormGroup{
        return this.formBuilder.group({
            arrival_point: new FormControl(null, Validators.required),
            quantity_of_seats: new FormControl(null, Validators.required),
            journey_date: new FormControl(null, Validators.required),
            journey_id: new FormControl(null)
        });
    }

    public getUserFormGroup(data?: userForm): UntypedFormGroup {
        return this.formBuilder.group({
            username: new FormControl(data?.username || null, Validators.required),
            password: new FormControl(data?.password || null, Validators.required),
            new_password: new FormControl(data?.new_password || null, Validators.required),
            confirm_password: new FormControl(data?.confirm_password || null, Validators.required),
            fullName: new FormControl(data?.fullName || null, Validators.required),
            phone: new FormControl(data?.phone || null, Validators.required),
        }); 
    }

    public getAdminUserFormGroup(data?: userForm, isEdit = false): UntypedFormGroup {
        const form = this.formBuilder.group({
            username: new FormControl(data?.login || null, Validators.required),
            password: new FormControl(data?.password || null, Validators.required),
            confirm_password: new FormControl(data?.confirm_password || null, Validators.required),
            fullName: new FormControl(data?.full_name || null, Validators.required),
            phone: new FormControl(data?.phone_number || null, Validators.required),
            role: new FormControl(data?.category || null, Validators.required)
        });
        if(isEdit) {
            form.addControl("new_password", new FormControl(data?.new_password || null, Validators.required));
        }
        return form;
    }

    public getTicketFormGroup(): UntypedFormGroup {
        return this.formBuilder.group({
            trip_id: new FormControl(),
            login: new FormControl()
        });
    }

    public getTripFormGroup(data?: Trip, isCreate = false): UntypedFormGroup {
        const form = this.formBuilder.group({
            trip_id: data?.trip_id,
            trip_number: data?.trip_number,
            ticket_price: data?.ticket_price,
        });
        if(isCreate) {
            form.addControl("arrival_point", new FormControl(null));
        }
        return form;
    }

    public getBusFormGroup(data?: Bus, isCreate = false): UntypedFormGroup {
        const form = this.formBuilder.group({
            bus_number: data?.bus_number,
            number_of_seats: data?.number_of_seats,
            driver_id:data?.driver_id,
            trip_id:data?.trip_id,
            bus_id:data?.bus_id
        });
        if(isCreate) {
            form.addControl("bus_brand", new FormControl(null));
        }
        return form;
    }

    public getDriverFormGroup(data?: Driver, isCreate = false): UntypedFormGroup {
        const form = this.formBuilder.group({
            driver_id: data?.driver_id,
            full_name: data?.full_name,
            phone_number:data?.phone_number,
            salary:data?.salary
        });
        if(isCreate) {
            form.addControl("date_of_birth", new FormControl(null));
            form.addControl("passport_id", new FormControl(null));
        }
        return form;
    }

    public getTimetableFormGroup(data?: Timetable, isCreate = false): UntypedFormGroup {
        const form = this.formBuilder.group({
            timetable_id: data?.timetable_id,
            departure_time: data?.departure_time,
            arrival_time:data?.arrival_time,
            bus_id:data?.bus_id
        });
        return form;
    }

    public getJourneyFormGroup(data?: Journey, isCreate = false): UntypedFormGroup {
        const form = this.formBuilder.group({
            journey_id: data?.journey_id,
            timetable_id: data?.timetable_id,
            actual_departure_time:data?.actual_departure_time,
            actual_arrival_time:data?.actual_arrival_time,
            journey_status:data?.journey_status,
            journey_date:data?.journey_date
        });
        
        return form;
    }

    public getBusCalcForm(): UntypedFormGroup {
        return this.formBuilder.group({
            start_date: null,
            end_date: null
        });
    }
}