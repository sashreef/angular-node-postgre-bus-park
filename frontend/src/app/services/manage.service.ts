import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { BookTicket, Login, Register, userForm } from "../interfaces/core.interfaces";
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class ManageService {
    public userInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
    public _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    public isLoggedIn = false;
    public userInfo: { username: string; role: string} | null = null;


    constructor(
        private readonly backendService:  BackendService,
        private cookieService: CookieService
    ) {

    }

    public login(userData: Login): Observable<any> {
        const data = {login:userData.username, password:userData.password};
        return this.backendService.auth.login$(data).pipe(
            tap((data: any) => {
                this.cookieService.set("accesstoken",`${data.accessToken}`);
                this.cookieService.set("role",`${data.role}`);
                this._isLoggedIn$.next(true);
                this.userInfo = {username : data.login,role : data.role};

                this.isLoggedIn = true;
            })
        );
    }

    public logout(): Observable<any> {
        return this.backendService.auth.logout$().pipe();
    }

    public register(userData: Register): Observable<any> {
        const data = {login:userData.username,password:userData.password,full_name:userData.fullName,phone_number:userData.phone};
        return this.backendService.auth.register$(data);
    }

    public refresh(token: string): Observable<any> {
        const role = this.cookieService.get("role");
        return this.backendService.auth.refresh$(token, role).pipe(
            tap((data) => {
                this.userInfo$.next({role: data.role, login: data.login});
                this.cookieService.delete("accesstoken");
                this.cookieService.set("accesstoken", data.accessToken);
                this.userInfo = {username : data.login,role : data.role};
                console.log("refresh success in back service");
            }, (err) => {
                throw err;
            })
        )
    }

    public bookTickets(bookTicket: BookTicket): Observable<any> {
        const data = {
            ...bookTicket,
            login: bookTicket.username
        };
        return this.backendService.bookings.bookingTickets$(data);
    }

    public getArrivalPoints(): Observable<any> {
        return this.backendService.getInfo.getArrivalPoints$();
    }

    public getTicketPrice(arrival_point:string,journey_date:string): Observable<any> {
        return this.backendService.getInfo.getTicketPrice$(arrival_point,journey_date);
    }

    public getQuantityOfFreeSeats(arrival_point:string,journey_date:string): Observable<any> {
        return this.backendService.getInfo.getQuantityOfFreeSeats$(arrival_point,journey_date);
    }
    
    public getUserInfo(): Observable<any> {
        return this.backendService.user.getUserInfo$();
    }

    public getBookingInfo(): Observable<any> {
        return this.backendService.bookings.getBookingInfo$();
    }

    public getUnpaidTickets(): Observable<any> {
        return this.backendService.tickets.getUnpaidTickets$();
    }

    public deleteBooking(booking_id: number): Observable<any> {
        return this.backendService.bookings.deleteBooking$(booking_id);
    }

    public changeUserData(userData: userForm): Observable<any> {
        const data = {login:userData.username, password: userData.password,new_password:userData.new_password,full_name:userData.fullName,phone_number:userData.phone};
        return this.backendService.user.changeUserData$(data);
    }

    public sellTicket(ticket_id: number): Observable<any> {
        return this.backendService.tickets.sellTicket$(ticket_id);
    }
    

    
}

