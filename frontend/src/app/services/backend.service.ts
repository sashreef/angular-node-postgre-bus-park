import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { BookTicketDTO, Bus, Driver, Journey, Ticket, Timetable, Trip } from "../interfaces/core.interfaces";

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
        bookingTickets$: (bookingData: BookTicketDTO): Observable<any> => {
            const url = `${this.config.api.root}/booking/book_tickets`;
            return this.http.post(url, {bookingData});
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

    public readonly bus = {
        addBus$: (busData: Bus): Observable<any> => {
            const url = `${this.config.api.root}/bus/add_bus`;
            return this.http.post(url, {busData});
        },

        updateBus$: (busData: Bus): Observable<any> => {
            const url = `${this.config.api.root}/bus/update_bus`;
            return this.http.post(url, {busData});
        },

        deleteBus$: (bus_id : number): Observable<any> => {
            const url = `${this.config.api.root}/bus/delete_bus`;
            return this.http.post(url , {bus_id});
        },

        getAllBuses$: (): Observable<any> => {
            const url = `${this.config.api.root}/bus/all_buses`;
            return this.http.get(url);
        }
        
        
    }

    public readonly driver = {
        addDriver$: (driverData: Driver): Observable<any> => {
            const url = `${this.config.api.root}/driver/add_driver`;
            return this.http.post(url, {driverData});
        },

        updateDriver$: (driverData: Driver): Observable<any> => {
            const url = `${this.config.api.root}/driver/update_driver`;
            return this.http.post(url, {driverData});
        },

        deleteDriver$: (driver_id : number): Observable<any> => {
            const url = `${this.config.api.root}/driver/delete_driver`;
            return this.http.post(url , {driver_id});
        },

        getAllDrivers$: (): Observable<any> => {
            const url = `${this.config.api.root}/driver/all_drivers`;
            return this.http.get(url);
        }
        
        
    }

    public readonly journey = {
        addJourney$: (journeyData: Journey): Observable<any> => {
            const url = `${this.config.api.root}/journey/add_journey`;
            return this.http.post(url, {journeyData});
        },

        updateJourney$: (journeyData: Journey): Observable<any> => {
            const url = `${this.config.api.root}/journey/update_journey`;
            return this.http.post(url, {journeyData});
        },

        deleteJourney$: (journey_id : number): Observable<any> => {
            const url = `${this.config.api.root}/journey/delete_journey`;
            return this.http.post(url , {journey_id});
        },

        getAllJourneys$: (): Observable<any> => {
            const url = `${this.config.api.root}/journey/all_journeys`;
            return this.http.get(url);
        }
        
        
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
        
        addTicket$: (ticketData: Ticket): Observable<any> => {
            const url = `${this.config.api.root}/ticket/add_ticket`;
            return this.http.post(url, {ticketData});
        }
    
    }

    public readonly timetable = {
        addTimetable$: (timetableData: Timetable): Observable<any> => {
            const url = `${this.config.api.root}/timetable/add_timetable`;
            return this.http.post(url, {timetableData});
        },

        updateTimetable$: (timetableData: Timetable): Observable<any> => {
            const url = `${this.config.api.root}/timetable/update_timetable`;
            return this.http.post(url, {timetableData});
        },

        getAllTimetables$: (): Observable<any> => {
            const url = `${this.config.api.root}/timetable/all_timetables`;
            return this.http.get(url);
        }
        
        
    }

    public readonly trip = {
        addTrip$: (tripData: Trip): Observable<any> => {
            const url = `${this.config.api.root}/trip/add_trip`;
            return this.http.post(url, {tripData});
        },

        updateTrip$: (tripData: Trip): Observable<any> => {
            const url = `${this.config.api.root}/trip/update_trip`;
            return this.http.post(url, {tripData});
        },

        deleteTrip$: (trip_id : number): Observable<any> => {
            const url = `${this.config.api.root}/trip/delete_trip`;
            return this.http.post(url , {trip_id});
        },

        getAllTrips$: (): Observable<any> => {
            const url = `${this.config.api.root}/trip/all_trips`;
            return this.http.get(url);
        }
    }

    public readonly getInfo = {
        getArrivalPoints$:(): Observable<any> => {
            const url = `${this.config.api.root}/public/arrival_points`;
            return this.http.get(url);
        },
        
        getTicketPrice$:(arrival_point:string, date:string): Observable<any> => {
            const url = `${this.config.api.root}/public/ticket_price`;
            const data = {arrival_point,date};
            
            return this.http.post(url, data);
        },

        getQuantityOfFreeSeats$:(arrival_point:string, journey_date:string): Observable<any> => {
            const url = `${this.config.api.root}/public/free_seats`;
            const data = {arrival_point, journey_date}
            return this.http.post(url, data);
        }
    }   

    public readonly statistics = {
        busInTrip$:(bus_number:string, start_date:string, end_date:string): Observable<any> => {
            const url = `${this.config.api.root}/statistics/bus_trip`;
            const data = {bus_number, start_date, end_date}
            return this.http.post(url, data);
        },

        sumTicketsOnTrip$:(trip_number:string, start_date:string, end_date:string): Observable<any> => {
            const url = `${this.config.api.root}/statistics/ticket_trip`;
            const data = {trip_number, start_date, end_date}
            return this.http.post(url, data);
        },
        
        difBookedAndPaid$:(trip_number:string, start_date:string, end_date:string): Observable<any> => {
            const url = `${this.config.api.root}/statistics/booked_paid`;
            const data = {trip_number, start_date, end_date}
            return this.http.post(url, data);
        },

    }

    public readonly user = {
        getUserInfo$:(): Observable<any> => {
            const url = `${this.config.api.root}/user_config/user_info`;
            return this.http.post(url,{});
        },

        getAllUsers$:(): Observable<any> => {
            const url = `${this.config.api.root}/user_config/all_users`;
            return this.http.post(url,{});
        },

        changeUserData$:(userData: {login: string, password: string, new_password: string, full_name: string, phone_number: string}): Observable<any> => {
            const url = `${this.config.api.root}/user_config/update_user`;
            return this.http.post(url,userData);
        },

        updateUserForAdmin$:(userData: {login: string, password: string,  full_name: string, phone_number: string , category:string}): Observable<any> => {
            const url = `${this.config.api.root}/user_config/update_admin`;
            return this.http.post(url,userData);
        },

        deleteUser$:(user_id : number): Observable<any> => {
            const url = `${this.config.api.root}/user_config/delete_user`;
            return this.http.post(url,{user_id});
        },
        
    }

}   