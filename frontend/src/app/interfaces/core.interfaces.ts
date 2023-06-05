

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

export interface Booking {
    journey_id: number;
    booking_id: number;
    quantity_of_seats: number;
    journey_date: string;
    booking_status: string;
    trip_number: string;
}
export interface Trip {
    arrival_point: string;
    quantity_of_seats: number;
    journey_date: string;
}

export interface userForm{
    username:string;
    password: string;
    new_password: string;
    confirm_password: string;
    fullName: string;
    phone: string;
}