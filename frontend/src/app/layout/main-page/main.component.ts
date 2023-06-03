import { Component } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject, delay, take, takeUntil } from "rxjs";
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
    public oneTicketCost?: number; 
    public numberOfSeats?: string; 

    private unsubscribe$$: Subject<void> = new Subject();
    
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
            this.options = options.map((option:any) => {
                this.pending = false;
                return [option.arrival_point, option.arrival_point];
            });
        });

        this.setFormSub()
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

    public ngOnDestroy() {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }

    private setFormSub(): void {
        this.mainForm.valueChanges.pipe(
            delay(300),takeUntil(this.unsubscribe$$)
        ).subscribe((formValue) => {
            if(formValue.arrival_point && formValue.journey_date) {
                console.log(formValue);
                this.numberOfSeats = "There is no trip on this date";
                this.getTicketInfo(formValue);
                this.getQuantityOfFreeSeats(formValue);
            }
        })
    }
    private getTicketInfo(formValue: any): void {
        this.manageService.getTicketPrice(formValue.arrival_point, formValue.journey_date).pipe(take(1)).subscribe((cost) => {
            this.oneTicketCost = cost.ticket_price;
        });
    }
    private getQuantityOfFreeSeats(formValue: any): void {
        this.manageService.getQuantityOfFreeSeats(formValue.arrival_point, formValue.journey_date).pipe(take(1)).subscribe((numberOfSeats) => {
            console.log(numberOfSeats.status);
            this.numberOfSeats = numberOfSeats.remaining_seats;
            

        });
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
