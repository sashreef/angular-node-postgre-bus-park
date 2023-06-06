import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { BookTicketDTO } from "../interfaces/core.interfaces";

@Injectable()
export class BackendService {
    public headers = new HttpHeaders({
		"Cache-Control": "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
		"Pragma": "no-cache",
		"Expires": "0"
	});

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigurationService,
    ) { } 

    public readonly auth = {
        login$: (userData: {login: string, password: string}): Observable<any> => {
            const url = `${this.config.api.root}/user/sign_in`;
            return this.http.post(url, userData, {withCredentials: true});
        },

        register$: (userData: {login: string, password: string, full_name: string, phone_number: string}): Observable<any> => {
            const url = `${this.config.api.root}/user/sign_up`;
            return this.http.post(url, userData);
        },

        refresh$: (token: string, role:string): Observable<any> => {
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}`,"Role": role });
            const url = `${this.config.api.root}/user/refresh`;
            return this.http.get<any>(url, { withCredentials: true, headers});
        },

        logout$: (): Observable<any> => {
            const url = `${this.config.api.root}/user/sign_out`;
            return this.http.get(url, {withCredentials: true});
        }

    }
    public readonly bookings = {
        bookingTickets$: (userData: BookTicketDTO): Observable<any> => {
            const url = `${this.config.api.root}/booking/book_tickets`;
            return this.http.post(url, userData);
        },

        getBookingInfo$: (): Observable<any> => {
            const url = `${this.config.api.root}/booking/bookings_info`;
            return this.http.get(url);
        },

        deleteBooking$: (booking_id : number): Observable<any> => {
            const url = `${this.config.api.root}/booking/delete_booking`;
            return this.http.post(url , {booking_id});
        },
        
    }

    public readonly tickets = {
        getUnpaidTickets$: (): Observable<any> => {
            const url = `${this.config.api.root}/ticket/unpaid_tickets`;
            return this.http.get(url);
        },

        sellTicket$: (ticket_id : number): Observable<any> => {
            const url = `${this.config.api.root}/ticket/sell_ticket`;
            return this.http.post(url , {ticket_id});
        },
        
    
    }
    public readonly getInfo = {
        getArrivalPoints$:(): Observable<any> => {
            const url = `${this.config.api.root}/public/arrival_points`;
            return this.http.get(url);
        },
        
        getTicketPrice$:(arrival_point:string, date:string): Observable<any> => {
            const url = `${this.config.api.root}/public/ticket_price`;
            const data = {arrival_point,date};
            
            console.log(data);
            return this.http.post(url, data);
        },

        getQuantityOfFreeSeats$:(arrival_point:string, journey_date:string): Observable<any> => {
            const url = `${this.config.api.root}/public/free_seats`;
            const data = {arrival_point, journey_date}
            return this.http.post(url, data);
        }
    }   

    public readonly user = {
        getUserInfo$:(): Observable<any> => {
            const url = `${this.config.api.root}/user_config/user_info`;
            return this.http.post(url,{});
        },

        changeUserData$:(userData: {login: string, password: string, new_password: string, full_name: string, phone_number: string}): Observable<any> => {
            const url = `${this.config.api.root}/user_config/update_user`;
            return this.http.post(url,userData);
        },
    }

}   