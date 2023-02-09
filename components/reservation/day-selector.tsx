import {
    ClassNames,
    DayPicker,
    SelectSingleEventHandler,
} from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import { Ref } from "react";
import dayjs from "dayjs";
import classes from "./day-selector.module.css";

interface DaySelectorProps {
    className?: string;
    radioGroupRef: Ref<HTMLDivElement>;
    selected: Date | undefined;
    setSelected: SelectSingleEventHandler;
}

function DaySelector(props: DaySelectorProps) {
    const { selected, setSelected } = props;

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
        tfoot: classes.customTfoot
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
                    <div
                        className={classes.radioContainer}
                        ref={props.radioGroupRef}
                    >
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
                                        name="time"
                                    />
                                    <label htmlFor={dateObj.time}>
                                        {dateObj.time}
                                    </label>
                                </div>
                            )
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default DaySelector;
