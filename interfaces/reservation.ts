export interface FormattedDate {
    date: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
}

export interface ReservationSerialized {
    _id: string;
    name: string;
    email: string;
    phone: number;
    time: string;
    formattedDate: FormattedDate;
    timeOfReservation: string;
    totalGuests: number;
}

export interface ReservationDeSerializedNoId {
    name: string;
    email: string;
    phone: number;
    time: Date;
    formattedDate: FormattedDate;
    timeOfReservation: Date;
    totalGuests: number;
}

export interface ReservationDeSerialized extends ReservationDeSerializedNoId{
    _id: string;
}
