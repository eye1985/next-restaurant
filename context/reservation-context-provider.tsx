import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

export const ReservationContext = createContext({
    selectedDay: new Date(),
    setSelectedDay: (() => {}) as Dispatch<SetStateAction<Date>>,
    selectedTime: "",
    setSelectedTime: (() => {}) as Dispatch<SetStateAction<string>>,
    timeError: false,
    setTimeError: (() => {}) as Dispatch<SetStateAction<boolean>>
});

function ReservationContextProvider({
    children,
}: {
    children: ReactNode | ReactNode[];
}) {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [timeError, setTimeError] = useState(false);

    return (
        <ReservationContext.Provider
            value={{
                selectedDay,
                setSelectedDay,
                selectedTime,
                setSelectedTime,
                timeError,
                setTimeError,
            }}
        >
            {children}
        </ReservationContext.Provider>
    );
}

export default ReservationContextProvider;
