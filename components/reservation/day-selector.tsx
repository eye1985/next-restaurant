import {ClassNames, DayPicker, SelectSingleEventHandler} from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import {Ref} from "react";
import {format} from "date-fns";
import dayjs from "dayjs";
import classes from "./day-selector.module.css";

interface DaySelectorProps{
    className:string;
    radioGroupRef:Ref<HTMLDivElement>;
    selected: Date | undefined;
    setSelected: SelectSingleEventHandler
}

function DaySelector(props:DaySelectorProps) {

    const {selected, setSelected} = props;

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, "PP")}.</p>;
    }

    const listOfReservations = (
        hour: number,
        min: number,
        loopNumber: number,
        selectedDate:Date,
    ) => {

        console.log(dayjs(selectedDate).format("DD.MM.YYYY"), "does it work")

        let tempLoop = 0;
        let tempTime = dayjs()
            .set("hour", hour)
            .set("minute", min)
            .set("second", 0);

        const result: string[] = [];

        while (tempLoop < loopNumber) {
            const add15min = tempTime.add(15, "minute");
            result.push(add15min.format("HH:mm"));
            tempTime = add15min;
            tempLoop++;
        }

        return result;
    };

    const classNames: ClassNames = {
        ...styles,
        root: "custom-root",
        months: "custom-months",
        tfoot:"custom-tfoot",
    };

    return (
        <div className={`${classes.daySelector} ${props.className}`}>
            <div className={classes.daySelectorContainer}>
                <div>
                    <div className={classes.calendar}>
                        <style>{`
                            .custom-root{
                                --rdp-cell-size: 40px;
                                --rdp-accent-color: #0000ff;
                                --rdp-background-color: #e7edff;
                                --rdp-accent-color-dark: #3003e1;
                                --rdp-background-color-dark: #180270;
                                --rdp-outline: 2px solid var(--rdp-accent-color);
                                --rdp-outline-selected: 3px solid var(--rdp-accent-color);
                                margin:0;
                            }
                            .custom-months{
                                display:flex;
                                justify-content:center;
                            }
                            
                            .custom-tfoot{
                                margin: 0.5em;
                            }
                            
                            .custom-tfoot p{
                                padding-left:9px;
                            }
                        `}</style>
                        <DayPicker
                            classNames={classNames}
                            mode="single"
                            required
                            disabled={{before: new Date()}}
                            selected={selected}
                            onSelect={setSelected}
                            footer={footer}
                        />
                    </div>

                    {selected? (
                        <div className={classes.radioContainer} ref={props.radioGroupRef}>
                            {listOfReservations(15, 45, 13, selected).map(
                                (time: string, index: number) => (
                                    <div
                                        className={classes.radioItem}
                                        key={`${index}_reservation-button`}
                                    >
                                        <input
                                            id={time}
                                            type="radio"
                                            value={time}
                                            name="time"
                                        />
                                        <label htmlFor={time}>{time}</label>
                                    </div>
                                )
                            )}
                        </div>
                    ):null}
                </div>
            </div>
        </div>
    );
}

export default DaySelector;
