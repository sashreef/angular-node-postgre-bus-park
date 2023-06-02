

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
export interface BookTicket {
    username: string;
    arrival_point: string;
    quantity_of_seats: number;
    booking_date: string;
    journey_date: string;
}

export interface Trip {
    arrival_point: string;
    quantity_of_seats: number;
    journey_date: string;
}