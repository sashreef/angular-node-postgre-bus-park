export interface UserInfo {
    login: string;
    role: string
}
export interface Login {
    username: string;
    password: string;
}
export interface Register {
    username: string;
    password: string;
    fullName: string;
    phone: string;
}
export interface BookTicket extends BookTicketDTO{
    username: string;
}

export interface BookTicketDTO {
    login: string;
    journey_id: number;
    quantity_of_seats: number;
    booking_date?: string;
}

export interface userForm {
    username: string;
    password: string;
    new_password: string;
    confirm_password: string;
    fullName: string;
    phone: string;
    role?: string;
    phone_number?: string;
    login?: string;
    full_name?: string;
    category?: string
    user_id?: string;
}

export interface addUserForm {
    username: string;
    password: string;
    new_password: string;
    confirm_password: string;
    fullName: string;
    phone: string;
    role?: string;
}

export interface Booking extends BookingCommon {
    journey_id: number;
}

export interface BookingCommon {
    booking_id: number;
    quantity_of_seats: number;
    journey_date: string;
    booking_status: string;
    trip_number: string;
}

export interface BookingInfo extends BookingCommon {
    bus_brand: string;
    arrival_point: string;
    departure_time: string;
}

export interface UnpaidTicket {
    ticket_id: number;
    journey_id: number;
    arrival_point: string;
    journey_date: string;
    login: string;
    ticket_status: string;
}

export interface Ticket {
    ticket_id: number;
    user_id: number;
    journey_id: number;
    sale_time: string;
    sale_date: string;
    ticket_status: string;
}

export interface Bus {
    bus_id: number;
    bus_number: number;
    bus_brand: string;
    number_of_seats: string;
    driver_id: string;
    trip_id: string;
}

export interface Driver {
    driver_id?:number;
    full_name: string;
    passport_id: string;
    date_of_birth: string;
    phone_number: string;
    salary: number;
}

export interface Journey {
    journey_id: number;
    timetable_id: number;
    actual_departure_time: string;
    actual_arrival_time: string;
    journey_status: string;
    journey_date: number;
}

export interface Timetable {
    timetable_id: number;
    departure_time: string;
    arrival_time: string;
    bus_id: number;
}

export interface Trip {
    trip_id: number;
    trip_number: string;
    arrival_point: string;
    ticket_price: string;
}

export class Notification {

    constructor(
      public id: number,
      public type: NotificationType,
      public title: string,
      public message: string,
      public timeout: number,
    ) { }
  
  }
  
  export enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
  }