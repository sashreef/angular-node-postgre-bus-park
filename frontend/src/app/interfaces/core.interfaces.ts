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
export interface Trip {
    arrival_point: string;
    quantity_of_seats: number;
    journey_date: string;
}

export interface userForm {
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