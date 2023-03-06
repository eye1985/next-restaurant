import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";

interface Reservation {
    selectedDay: Date;
    setSelectedDay: Dispatch<SetStateAction<Date>>;
    selectedTime: string;
    setSelectedTime: Dispatch<SetStateAction<string>>;
    timeError: boolean;
    setTimeError: Dispatch<SetStateAction<boolean>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    fullName: string;
    setFullName: Dispatch<SetStateAction<string>>;
    phone: number | null;
    setPhoneNumber: Dispatch<SetStateAction<number | null>>;
    totalGuests: number,
    setTotalGuests: Dispatch<SetStateAction<number>>;
}

export const ReservationContext = createContext<Reservation>({
    selectedDay: new Date(),
    setSelectedDay: (() => {}) as Dispatch<SetStateAction<Date>>,
    selectedTime: "",
    setSelectedTime: (() => {}) as Dispatch<SetStateAction<string>>,
    timeError: false,
    setTimeError: (() => {}) as Dispatch<SetStateAction<boolean>>,
    email: "",
    setEmail: (() => {}) as Dispatch<SetStateAction<string>>,
    fullName: "",
    setFullName: (() => {}) as Dispatch<SetStateAction<string>>,
    phone: null,
    setPhoneNumber: (() => {}) as Dispatch<SetStateAction<number | null>>,
    totalGuests: 2,
    setTotalGuests: (() => {}) as Dispatch<SetStateAction<number>>,
});

function ReservationContextProvider({
    children,
}: {
    children: ReactNode | ReactNode[];
}) {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [timeError, setTimeError] = useState(false);

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhoneNumber] = useState<number | null>(null);
    const [totalGuests, setTotalGuests] = useState(2);

    return (
        <ReservationContext.Provider
            value={{
                selectedDay,
                setSelectedDay,
                selectedTime,
                setSelectedTime,
                timeError,
                setTimeError,
                email,
                setEmail,
                fullName,
                setFullName,
                phone,
                setPhoneNumber,
                totalGuests,
                setTotalGuests,
            }}
        >
            {children}
        </ReservationContext.Provider>
    );
}

export default ReservationContextProvider;
