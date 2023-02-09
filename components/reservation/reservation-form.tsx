import DaySelector from "@/components/reservation/day-selector";
import { FormEvent, useRef, useState } from "react";
import classes from "./reservation-form.module.css";
import NumberSelector from "@/components/reservation/number-selector";
import { SelectSingleEventHandler } from "react-day-picker";
import Modal from "react-modal";
import dayjs from "dayjs";

interface ReservationFormProps {
    submitReservationHandler : () => void
}

function ReservationForm(props:ReservationFormProps) {
    const selectInputRef = useRef<HTMLSelectElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const radioGroupRef = useRef<HTMLDivElement>(null);
    const [hasError, setHasError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    Modal.setAppElement("#__next");

    const submitFormHandler = (event: FormEvent) => {
        event.preventDefault();

        setHasError(false);
        setTimeError(false);

        const emailValue = emailInputRef.current?.value;
        const selectPersonsValue = selectInputRef.current?.value;
        const radioGroupDiv = radioGroupRef.current;

        const selectedRadio: HTMLInputElement | null | undefined =
            radioGroupDiv?.querySelector("input[type='radio']:checked");

        if (!selectedRadio) {
            setTimeError(true);
            return;
        }

        if (!emailValue) {
            setHasError(true);
            return;
        }

        openModal();
    };

    const submitHandler = () => {
        props.submitReservationHandler();
        closeModal();
    };

    return (
        <>
            <form className={classes.reservationForm} onSubmit={submitFormHandler}>
                <NumberSelector refObj={selectInputRef} />
                <DaySelector
                    selected={selectedDate}
                    setSelected={setSelectedDate as SelectSingleEventHandler}
                    radioGroupRef={radioGroupRef}
                ></DaySelector>
                {timeError ? (
                    <p className={classes.error}>Please select a time</p>
                ) : null}

                <div className={classes.formControl}>
                    <label htmlFor="email">E-mail:</label>
                    <input id="email" type="email" ref={emailInputRef} placeholder="youremail@provider.com" />
                    {hasError ? (
                        <p className={classes.error}>
                            Please input a correct e-mail address
                        </p>
                    ) : null}
                </div>

                <div className={classes.submitContainer}>
                    <button className={classes.submit}>
                        Reserve for two hours
                    </button>
                </div>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p>
                    Are you sure you want to reserve for{" "}
                    {selectInputRef.current?.value} {" "}
                    person at{" "}
                    {dayjs(
                        (
                            radioGroupRef.current?.querySelector(
                                "input[type='radio']:checked"
                            ) as HTMLInputElement
                        )?.value
                    ).format("DD.MM.YYYY HH:mm")}
                </p>

                <button onClick={submitHandler}>Confirm</button>
            </Modal>
        </>
    );
}

export default ReservationForm;
