import { Component } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { Subject, combineLatest, delay, take, takeUntil } from "rxjs";
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
    public oneTicketCost?: string; 
    public numberOfSeats?: string; 

    private unsubscribe$$: Subject<void> = new Subject();
    
    constructor (
        private manageService: ManageService,   
        private formBuilder: UntypedFormBuilder,
        private cookieService: CookieService
    ) {
        this.mainForm = this.formBuilder.group({
            arrival_point: new FormControl(null, Validators.required),
            quantity_of_seats: new FormControl(null, Validators.required),
            journey_date: new FormControl(null, Validators.required),
            journey_id: new FormControl(null)
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
        },
        (err) => {
            console.log(err)
        });
    }

    public ngOnDestroy() {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }

    private setFormSub(): void {
        this.mainForm.get("arrival_point")?.valueChanges.pipe(
            delay(300), takeUntil(this.unsubscribe$$)
        ).subscribe((formValue) => {
            if(formValue && this.mainForm.get("journey_date")?.value) {
                this.getTicketInfo(this.mainForm.value);
            }
        });

        this.mainForm.get("journey_date")?.valueChanges.pipe(
            delay(300), takeUntil(this.unsubscribe$$)
        ).subscribe((formValue) => {
            if(formValue && this.mainForm.get("arrival_point")?.value) {
                this.getTicketInfo(this.mainForm.value);
            }
        });
    }

    private getTicketInfo(formValue: any): void {
        const reqArray = [
            this.manageService.getTicketPrice(formValue.arrival_point, formValue.journey_date),
            this.manageService.getQuantityOfFreeSeats(formValue.arrival_point, formValue.journey_date)
        ];
        combineLatest(reqArray).pipe(take(1)).subscribe((data) => {
            this.oneTicketCost = data[0].ticket_price;
            this.mainForm.patchValue({journey_id: data[1].journey_id}, {emitEvent:false})
            this.numberOfSeats = data[1].remaining_seats;
        },
            (error) => {
                this.numberOfSeats = "There is no trip on this date";
                this.oneTicketCost = "";
                throw error;
            }
        )
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
