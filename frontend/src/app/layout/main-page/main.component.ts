import {  ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject, combineLatest, delay, take, takeUntil } from "rxjs";
import { ListItem } from "src/app/core.module/utils/template";
import { BookTicket } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";
import { ManageService } from "src/app/services/manage.service";
import { NotificationService } from "src/app/services/notification.service";

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
        private formBuilderService: FormBuilderService,
        private _notificationSvc: NotificationService
    ) {
        this.mainForm = this.formBuilderService.getBookTicketGroup();
      
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
        console.log(this.mainForm);
        
        if(this.mainForm.invalid) {
            throw "Не заполнены обязательные поля"
        }


        this.manageService.bookTickets(data).pipe(take(1)).subscribe((data) => {
            
            this._notificationSvc.success("Booking success", "Booking successed",3000);
            this.mainForm.controls['arrival_point'].setValue(null);
            this.mainForm.controls['journey_date'].setValue(new Date().toISOString().split("T")[0]);
            this.mainForm.controls['quantity_of_seats'].setValue(null);
            this.mainForm.controls['journey_id'].setValue(null);

            this.oneTicketCost = ""; 
            this.numberOfSeats= "";
        },
        (err) => {  
            this._notificationSvc.error("Booking Error", err.error.error,3000);
        });
        
        
    }

    public ngOnDestroy() {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }

    public getDate(type : string) : string {
        const today = new Date().toISOString().split("T")[0];
        if(type === "min"){
            return today;
        }
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth.toISOString().split("T")[0];
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
    }
