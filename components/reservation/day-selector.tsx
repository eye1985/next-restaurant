import {
    ClassNames,
    DayPicker,
    SelectSingleEventHandler,
} from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import dayjs from "dayjs";
import classes from "./day-selector.module.css";
import errorClasses from "@/styles/utils/error.module.css";
import { ChangeEvent, useContext } from "react";
import { ReservationContext } from "@/context/reservation-context-provider";

interface DaySelectorProps {
    className?: string;
    selected: Date | undefined;
    setSelected: SelectSingleEventHandler;
    radioChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

function DaySelector(props: DaySelectorProps) {
    const { selected, setSelected } = props;
    const { timeError } = useContext(ReservationContext);

    const listOfReservations = (
        hour: number,
        min: number,
        loopNumber: number,
        selectedDate: Date
    ) => {
        let tempLoop = 0;
        let tempTime = dayjs(selectedDate)
            .set("hour", hour)
            .set("minute", min)
            .set("second", 0);

        const result: { time: string; iso: string }[] = [];

        while (tempLoop < loopNumber) {
            const add15min = tempTime.add(15, "minute");

            result.push({
                time: add15min.format("HH:mm"),
                iso: add15min.toISOString(),
            });
            tempTime = add15min;
            tempLoop++;
        }

        return result;
    };

    const classNames: ClassNames = {
        ...styles,
        root: classes.customRoot,
        months: classes.customMonths,
        tfoot: classes.customTfoot,
    };

    const isWeekday = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 1;
    };

    const disabledDays = [isWeekday, { before: new Date() }];

    return (
        <div className={`${classes.daySelector} ${props.className}`}>
            <div className={classes.daySelectorContainer}>
                <div className={classes.calendar}>
                    <DayPicker
                        classNames={classNames}
                        mode="single"
                        required
                        disabled={disabledDays}
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>

                {selected ? (
                    <div>
                        <div className={classes.radioContainer}>
                            {listOfReservations(15, 45, 13, selected).map(
                                (dateObj, index: number) => (
                                    <div
                                        className={classes.radioItem}
                                        key={`${index}_reservation-button`}
                                    >
                                        <input
                                            id={dateObj.time}
                                            type="radio"
                                            value={dateObj.iso}
                                            onChange={props.radioChangeHandler}
                                            name="time"
                                        />
                                        <label htmlFor={dateObj.time}>
                                            {dateObj.time}
                                        </label>
                                    </div>
                                )
                            )}
                        </div>
                        {timeError ? (
                            <p className={errorClasses.errorText}>
                                Please select a time
                            </p>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default DaySelector;
