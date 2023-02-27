export interface ReservationSerialized {
    _id: string;
    name:string;
    email: string;
    phone: number;
    time: string;
    timeOfReservation: string;
    totalGuests: number;
}

export interface ReservationDeSerialized {
    _id: string;
    name:string;
    email: string;
    phone: number;
    time: Date;
    timeOfReservation: Date;
    totalGuests: number;
}
