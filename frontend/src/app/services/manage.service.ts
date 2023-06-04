import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { BookTicket, Login, Register } from "../interfaces/core.interfaces";
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class ManageService {
    public token?: {token: string, isAlive: boolean};
    public userInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
    public _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();


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
                this.setTokenLifeTimer();
                this._isLoggedIn$.next(true);
            })
        );
    }

    public register(userData: Register): Observable<any> {
        const data = {login:userData.username,password:userData.password,full_name:userData.fullName,phone_number:userData.phone};
        return this.backendService.auth.register$(data);
    }

    public refresh(token: string): Observable<any> {
        const role = this.cookieService.get("role");
        return this.backendService.auth.refresh$(token, role).pipe(
            tap((response) => {
                this.userInfo$.next({role: response.role, login: response.login});
                this.token = {token: response.accessToken, isAlive: true};
                this.setTokenLifeTimer();
                console.log("refresh success");
            }, (err) => {
                throw err;
            })
        )
    }

    public setTokenLifeTimer() {
        setTimeout(() => {
            if(this.token?.token) {
                this.token = {token: this.token.token, isAlive: false};
                this.refresh(this.token.token);
            }
        }, 29900)
    }

    public bookTickets(bookTicket: BookTicket): Observable<any> {
        const data = {
            ...bookTicket,
            login: bookTicket.username
        };
        console.log(data);
        return this.backendService.bookings.bookingTickets$(data);
    }

    public getArrivalPoints(): Observable<any> {
        return this.backendService.getInfo.getArrivalPoints$();
    }
    public getTicketPrice(arrival_point:string,journey_date:string): Observable<any> {
        console.log("111111");
        return this.backendService.getInfo.getTicketPrice$(arrival_point,journey_date);
    }
    public getQuantityOfFreeSeats(arrival_point:string,journey_date:string): Observable<any> {
        return this.backendService.getInfo.getQuantityOfFreeSeats$(arrival_point,journey_date);
    }
}

