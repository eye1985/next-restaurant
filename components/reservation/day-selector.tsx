import {
    ClassNames,
    DayPicker,
} from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import dayjs from "dayjs";
import classes from "./day-selector.module.css";
import { ChangeEvent, RefObject, useContext, useEffect, useRef } from "react";
import { ReservationContext } from "@/context/reservation-context-provider";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import FormErrorLabel from "@/components/form/form-elements/form-error-label";
import { dayjsNorway } from "@/utils/date";

dayjs.extend(utc);
dayjs.extend(timezone);

interface DaySelectorProps {
    className?: string;
    selected: Date | undefined;
    isEdit?: boolean;
    setSelected: (day: Date) => void;
    radioChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

function DaySelector(props: DaySelectorProps) {
    const { selected, setSelected, isEdit } = props;
    const { timeError } = useContext(ReservationContext);
    const radioContainer = useRef<HTMLDivElement>(null);

    const selectedRadioElement = (
        selectedDate: Date,
        radioRef: RefObject<HTMLDivElement>
    ): HTMLInputElement | null => {
        if (!radioRef || !radioRef.current) {
            return null;
        }

        const timeISO = dayjsNorway(selectedDate).toISOString();
        return radioRef.current.querySelector(
            `input[type='radio'][value='${timeISO}']`
        ) as HTMLInputElement;
    };

    useEffect(() => {
        if (isEdit && radioContainer.current && selected) {
            const radioElement = selectedRadioElement(selected, radioContainer);
            radioElement?.setAttribute("checked", "checked");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const listOfReservations = (
        hour: number,
        min: number,
        loopNumber: number,
        selectedDate: Date
    ) => {
        let tempLoop = 0;
        let tempTime = dayjsNorway(selectedDate)
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

    const isSundayMonday = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 1;
    };

    const disabledDays = [isSundayMonday, { before: dayjsNorway(new Date()).toDate() }];

    const recursiveFirstAvailableDate = (
        selectedDate: Date,
        days: number,
        check: (date: Date) => boolean
    ): Date => {
        if (check(selectedDate)) {
            const addedDayDate = dayjsNorway(selectedDate).toDate();
            addedDayDate.setDate(addedDayDate.getDate() + days);
            return recursiveFirstAvailableDate(addedDayDate, 1, check);
        }

        return selectedDate;
    };

    let selectedDate = selected;
    if (selected) {
        selectedDate = recursiveFirstAvailableDate(selected, 1, isSundayMonday);
    }

    return (
        <div className={`${classes.daySelector} ${props.className}`}>
            <div className={classes.daySelectorContainer}>
                <div className={classes.calendar}>
                    <DayPicker
                        classNames={classNames}
                        defaultMonth={selectedDate}
                        mode="single"
                        required
                        disabled={disabledDays}
                        selected={selectedDate}
                        onSelect={(day) => {
                            let pickedDate = dayjsNorway(new Date()).toDate();
                            if (day) {
                                pickedDate = day;
                            }
                            if (selectedDate) {
                                const radioElement = selectedRadioElement(
                                    selectedDate,
                                    radioContainer
                                );

                                if (radioElement) {
                                    const radioDate = dayjsNorway(
                                        radioElement.value
                                    );

                                    pickedDate = dayjsNorway(pickedDate)
                                        .set("hour", radioDate.hour())
                                        .set("minute", radioDate.minute())
                                        .set("second", 0)
                                        .toDate();
                                }
                            }

                            setSelected(pickedDate);
                        }}
                    />
                </div>

                {selected ? (
                    <div>
                        <div
                            className={classes.radioContainer}
                            ref={radioContainer}
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
                            <FormErrorLabel message="Please select a time" />
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default DaySelector;
