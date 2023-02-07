import DaySelector from "@/components/reservation/day-selector";
import { FormEvent, useRef, useState } from "react";
import classes from "./reservation-form.module.css";
import NumberSelector from "@/components/reservation/number-selector";
import {formatISO} from "date-fns";

function ReservationForm() {
    const selectInputRef = useRef<HTMLSelectElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const radioGroupRef = useRef<HTMLDivElement>(null);
    const [hasError, setHasError] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const emailValue = emailInputRef.current?.value;
        const selectValue = selectInputRef.current?.value;
        const radioGroupDiv = radioGroupRef.current;

        const selectedRadio: HTMLInputElement | null | undefined =
            radioGroupDiv?.querySelector("input[type='radio']:checked");

        console.log(selectValue);
        console.log(selectedRadio?.value);
        if(selectedDate){
            console.log(selectedDate, "selected date");
        }

        if (!emailValue) {
            setHasError(true);
            return;
        }

        setHasError(false);
    };

    return (
        <form className={classes.reservationForm} onSubmit={submitHandler}>
            <NumberSelector refObj={selectInputRef} />
            <DaySelector
                selected={selectedDate}
                setSelected={setSelectedDate}
                className={classes.margin}
                radioGroupRef={radioGroupRef}
            ></DaySelector>

            <div className={classes.formControl}>
                <label htmlFor="email">E-mail:</label>
                <input id="email" type="email" ref={emailInputRef} />
                {hasError ? (
                    <p className={classes.error}>
                        Please input a correct e-mail address
                    </p>
                ) : (
                    ""
                )}
            </div>

            <div className={classes.submitContainer}>
                <button className={classes.submit}>Reserve for two hours</button>
            </div>
        </form>
    );
}

export default ReservationForm;
