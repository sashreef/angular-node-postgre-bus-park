import { Component } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { Subject, take, takeUntil } from "rxjs";
import { userForm } from "src/app/interfaces/core.interfaces";
import { FormBuilderService } from "src/app/services/form-builder.service";
import { ManageService } from "src/app/services/manage.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})

export class UserComponent {
  public userForm?: UntypedFormGroup;
  public bookings: any[] = [];
  public filteredBookings: any[] = [];
  public pending = false;
  public USER_REGEX = /^[A-z0-9-_]{4,23}/;
  public PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  public PHONE_REGEX = /^(\+\d{2})\(?(\d{3})\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  public FULLNAME_REGEX = /^[A-Za-z-\s]{10,50}$/;
  public listNamesArray = [{ lable: "User profile", value: "User profile" }, { lable: "Your bookings", value: "Your bookings " }];

  public searchForm: UntypedFormGroup

  private unsubscribe$$: Subject<void> = new Subject();
  private selectedBooking: any;

  constructor(
    private manageService: ManageService,
    private formBuilder: UntypedFormBuilder,
    private formBuilderService: FormBuilderService
  ) {

    this.searchForm = this.formBuilder.group({
      search: null
    })
  }
  public changeUserData(data: userForm): void {

    this.manageService.changeUserData(data).pipe(take(1)).subscribe((data) => {
      console.log(data);
    },
      (err) => {
        console.log(err);
      });
  }
  public ngOnInit(): void {
    this.pending = true;
    this.manageService.getUserInfo().pipe(take(1)).subscribe((data: any) => {
      const userData = { username: data.login, fullName: data.full_name, phone: data.phone_number, password: data.password, new_password: data.new_password, confirm_password: data.confirm_password };
      this.userForm = this.formBuilderService.getUserFormGroup(userData);
    });

    this.manageService.getBookingInfo().pipe(take(1)).subscribe((data: any) => {
      this.bookings = data;
    });

    this.setSearchSub();
  }

  public selectBooking(booking: any): void {
    this.selectedBooking = booking;
  }

  isSelected(booking: any): boolean {
    return this.selectedBooking === booking;
  }

  public deleteBooking(){
    this.manageService.deleteBooking(this.selectedBooking.booking_id).pipe(take(1)).subscribe((data) => {
    },
      (err) => {
        console.log(err);
      });
  }

  public isValidUserForm(): boolean {
    const fullName = this.userForm?.controls['fullName'].value;
    const phone = this.userForm?.controls['phone'].value;
    const password = this.userForm?.controls['password'].value;
    const confirmPassword = this.userForm?.controls['confirm_password'].value;
    const new_password = this.userForm?.controls['new_password'].value;
    const isFullNameValid = this.FULLNAME_REGEX.test(fullName);
    const isPhoneValid = this.PHONE_REGEX.test(phone);

    if (new_password) {
      const isNewPasswordValid = this.PWD_REGEX.test(new_password);
      const isConfirmPasswordValid = new_password === confirmPassword;

      if (isFullNameValid && isPhoneValid && fullName && phone && password) {
        // Выполнить проверки только если все поля заполнены
        if (isNewPasswordValid && isConfirmPasswordValid) {
          console.log(true);
          return true;
        }
      }
    } else {
      // Продолжить без проверок new_password и confirm_password
      if (isFullNameValid && isPhoneValid && fullName && phone && password) {
        return true;
      }
    }
    return false; // Если условия не выполнены, вернуть false
  }

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  private setSearchSub(): void {
    this.searchForm.controls["search"]?.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((id) => {
      if(!id) {
        this.filteredBookings = this.bookings;
        return;
      }
      this.filteredBookings = this.bookings.filter((booking) => booking.booking_id === id);
    });
  }









}
