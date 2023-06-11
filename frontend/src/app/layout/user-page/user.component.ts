  import { Component } from "@angular/core";
  import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
  import { Subject, combineLatest, take, takeUntil } from "rxjs";
  import { BookingInfo, Ticket, Trip, UnpaidTicket, userForm } from "src/app/interfaces/core.interfaces";
  import { FormBuilderService } from "src/app/services/form-builder.service";
  import { ManageService } from "src/app/services/manage.service";

  @Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.css"]
  })

  export class UserComponent {
    public activeType = { label: "User profile", value: "userProfile" , icon: "account_circle"};
    public userInfo?: { login: string; role: string; };
    public userForm?: UntypedFormGroup;
    public addUserForm?: UntypedFormGroup | null;
    public addTicketForm?: UntypedFormGroup | null;
    public bookings: BookingInfo[] = [];
    public users: userForm[] = [];
    public tableArray: any[] | null = null;
    public optionalTableArray: any[] | null = null;
    public selectedUser: any;
    public selectedAdminUser: any;
    public unpaidTickets: UnpaidTicket[] = [];
    public filteredBookings: any[] = [];
    public pending = false;
    public listTypesArray: { label: string; value: string }[] = [];
    public searchForm: UntypedFormGroup
    public mode: "view" | "create" | "edit" = "view";

    private unsubscribe$$: Subject<void> = new Subject();
    private selectedBooking: any;

    public USER_REGEX = /^[A-z0-9-_]{4,23}/;
    public PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    public PHONE_REGEX = /^(\+\d{2})\(?(\d{3})\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    public FULLNAME_REGEX = /^[A-Za-z-\s]{10,50}$/;
    constructor(
      private manageService: ManageService,
      private formBuilder: UntypedFormBuilder,
      private formBuilderService: FormBuilderService
    ) {

      this.searchForm = this.formBuilder.group({
        search: null
      })
    }

    public ngOnInit(): void {
      this.pending = true;
      this.manageService.userInfo$.pipe(takeUntil(this.unsubscribe$$)).subscribe((info) => {
        if (info) {
          this.userInfo = info;
          this.createTabsArray();
        }
      });
      this.getUserInfo();
      this.setSearchSub();
    }

    public selectType(type: { label: string, value: string , icon: string}): void {
      this.activeType = type;
      this.getSelectedReq(type);
    }

    public changeUserData(data: userForm): void {
      this.manageService.changeUserData(data).pipe(take(1)).subscribe();
    }

    public selectBooking(booking: any): void {
      this.selectedBooking = booking;
    }

    public selectUser(user: any): void {
      this.selectedUser = user;
    }

    public showAddUserForm(flag: boolean): void {
      if(!flag) {
        this.mode = "view";
        this.addUserForm = null;
        return;
      }
      this.mode = "create";
      this.addUserForm = this.formBuilderService.getAdminUserFormGroup();
    }

    public isSelectedUser(user: any): boolean {
      return this.selectedUser === user;
    }

    public deleteBooking(): void {
      this.pending = true;
      this.manageService.deleteBooking(this.selectedBooking.booking_id).pipe(take(1)).subscribe((data) => {
        this.pending = false;
      },
      (err) => {
          throw err;
      });
    }

    public updateUser(user: userForm): void{
      this.addUserForm = this.formBuilderService.getAdminUserFormGroup(user, true);
      this.mode = "edit";
    }

    public deleteUser(): void {
      this.pending = true;
      this.manageService.deleteUser(this.selectedUser.user_id).pipe(take(1)).subscribe((data) => {
        this.pending = false;
      },
        (err) => {
          throw err;
        });
    }

    public createTicket(flag: boolean,ticketForm:Ticket): void {
      if(!flag) {
        this.addTicketForm = null;
        return;
      }
      this.manageService.addTicket(ticketForm).pipe(take(1)).subscribe((data) => {
        this.pending = false;
      },
      (err) => {
         throw err;
      });
      this.addTicketForm = null;
      // если на создание не будет отправляется форма => попробовать создать отдельную bool паблик переменную
      // и условия открытия формы создания завязать на нее, 
    }

    public sellTicket(ticket_id: number): void {
      this.pending = true;
      this.manageService.sellTicket(ticket_id).pipe(take(1)).subscribe((data) => {
        this.pending = false;
      },
      (err) => {
         throw err;
      });
        this.getUnpaidTickets();
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

    public closeForm() {
      this.mode = "view";
      this.addUserForm = null;
    }

    public ngOnDestroy(): void {
      this.unsubscribe$$.next();
      this.unsubscribe$$.complete();
    }

    private setSearchSub(): void {
      this.searchForm.controls["search"]?.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((id) => {
        if (!id) {
          this.filteredBookings = this.activeType.value === "yourBookings" || this.activeType.value === "bookings"  ? this.bookings : 
          this.activeType.value === "usersActions" ? this.users : this.unpaidTickets;
          return;
        }
        this.filteredBookings = (this.activeType.value === "yourBookings" || this.activeType.value === "bookings") ?
          this.bookings.filter((booking) => booking.booking_id.toString().includes(id)) :
          this.activeType.value === "usersActions" ? 
          this.users.filter((user) => user.user_id?.toString().includes(id))
          : this.unpaidTickets.filter((ticket) => ticket.ticket_id.toString().includes(id))
      });
    }

    private getUserInfo(): void {
      this.manageService.getUserInfo().pipe(take(1)).subscribe((data: any) => {
        const userData = { username: data.login, fullName: data.full_name, phone: data.phone_number, password: data.password, new_password: data.new_password, confirm_password: data.confirm_password };
        this.userForm = this.formBuilderService.getUserFormGroup(userData);
      });
    }
    
    public getAllUsers(): void {
      this.filteredBookings = [];
      this.manageService.getAllUsers().pipe(takeUntil(this.unsubscribe$$)).subscribe((data: userForm[]) => {
          this.filteredBookings = data;
          this.users = data
      })
    }

    private getBookingInfo(): void {
      this.filteredBookings = [];
      this.manageService.getBookingInfo().pipe(take(1)).subscribe((data: BookingInfo[]) => {
        this.bookings = data;
        this.filteredBookings = data;
      });
    }

    private getUnpaidTickets() {
      this.filteredBookings = [];
      this.manageService.getUnpaidTickets().pipe(take(1)).subscribe((data: UnpaidTicket[]) => {
        this.unpaidTickets = data;
        this.filteredBookings = data;
      });
    }

    private getTripsInfo() {
      this.filteredBookings = [];
      this.tableArray = null;
      this.manageService.getAllTrips().pipe(take(1)).subscribe((data: Trip[]) => {
        this.tableArray = data;
      });
    }

    private getStatisticsInfo() {
      this.filteredBookings = [];
      this.tableArray = null;
      this.optionalTableArray = null;
    //   combineLatest(reqArray).pipe(take(1)).subscribe((data) => {
    //     this.oneTicketCost = data[0].ticket_price;
    //     this.mainForm.patchValue({journey_id: data[1].journey_id}, {emitEvent:false})
    //     this.numberOfSeats = data[1].remaining_seats;
    // },
      // const reqArray = [this.manageService.getAllTrips(), this.manageService.getAllBuses()]; 
      combineLatest([this.manageService.getAllTrips(), this.manageService.getAllBuses()]).pipe(take(1)).subscribe((data) => {
        this.tableArray = data[0];
        this.optionalTableArray = data[1];
      });
    }
    
    private createTabsArray(): void {
      const commonTypes = [{ label: "User profile", value: "userProfile" , icon: "account_circle"}];
      let specifiedTypes;
      switch (this.userInfo?.role) {
        case "client": {
          specifiedTypes = [
            { label: "Your Bookings", value: "yourBookings", icon: "event_seat" }
          ]
          break;
        }
        case "cashier": {
          specifiedTypes = [
            { label: "Bookings", value: "bookings", icon: "event_seat" },
            { label: "Sell tickets", value: "sellTickets", icon: "attach_money" }
          ]
          break;
        }
        case "administrator": {
          specifiedTypes = [
            { label: "Bookings", value: "bookings" , icon: "event_seat"},
            { label: "Sell tickets", value: "sellTickets", icon: "attach_money" },
            { label: "Users", value: "usersActions" , icon: "person"},
            { label: "Trips", value: "tripsActions" , icon: "commute"},
            { label: "Buses", value: "busesActions", icon: "directions_bus" },
            { label: "Drivers", value: "driversActions" , icon: "person"},
            { label: "Timetables", value: "timetablesActions", icon: "departure_board" },
            { label: "Journeys", value: "journeysActions" , icon: "commute"},
            { label: "Statistics", value: "statistics" , icon: "bar_chart"},
          ]
        }
      }
      this.listTypesArray = commonTypes.concat(specifiedTypes || []);
    }

    private getSelectedReq(type: { label: string, value: string , icon: string}): void {
      switch (type.value) {
        case "yourBookings": case "bookings": {
          this.getBookingInfo();
          break;
        }
        case "sellTickets": {
          this.getUnpaidTickets();
          break;
        }
        case "usersActions": {
          this.getAllUsers();
          break;
        }
        case "tripsActions": {
          this.getTripsInfo();
          break;
        }
        case "busesActions": {
          this.getAllUsers();
          break;
        }
        case "driversActions": {
          this.getAllUsers();
          break;
        }
        case "timetablesActions": {
          this.getAllUsers();
          break;
        }
        case "journeysActions": {
          this.getAllUsers();
          break;
        }
        case "statistics": {
          this.getStatisticsInfo();
        }    
      }
    }
  }
