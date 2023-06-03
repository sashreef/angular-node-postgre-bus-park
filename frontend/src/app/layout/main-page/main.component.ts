import { Component } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { take } from "rxjs";
import { ListItem } from "src/app/core.module/utils/template";
import { BookTicket } from "src/app/interfaces/core.interfaces";
import { ManageService } from "src/app/services/manage.service";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})

export class MainComponent {
    public mainForm: UntypedFormGroup;
    public pending = false;
    public options: ListItem[] = [];
    public array: ListItem[] = [["label1", "valu1e"], ["label2", "value2"]]; 
    
    constructor (
        private manageService: ManageService,   
        private formBuilder: UntypedFormBuilder,
    ) {
        this.mainForm = this.formBuilder.group({
            arrival_point: new FormControl(null, Validators.required),
            login: new FormControl(null, Validators.required),
            quantity_of_seats: new FormControl(null, Validators.required),
            booking_date: new FormControl(null, Validators.required),//сегодняшняя дата
            journey_date: new FormControl(null, Validators.required)
        });
      
    }

    public ngOnInit(): void {
        this.pending = true;
        this.manageService.getArrivalPoints().pipe(take(1)).subscribe((options: string[]) => {
            this.options = options.map((option) => {
                return [option, option];
            });
        });
    }

    public bookTicket(data: BookTicket): void {
        if(this.mainForm.invalid) {
            throw "Не заполнены обязательные поля"
        }
        this.manageService.bookTickets(data).pipe(take(1)).subscribe((data) => {
            console.log(data);
        },
        (err) => {
            console.log(err)
        });
        console.log(data);
    }
    // public getTripInfo(data: Trip): void {
    //     if(this.mainForm.invalid) {
    //         throw "Не заполнены обязательные поля"
    //     }
    //     this.manageService.bookTickets(data).pipe(take(1)).subscribe((data) => {
    //         console.log(data);
    //     },
    //     (err) => {
    //         console.log(err)
    //     });
    //     console.log(data);
    // }
    }
