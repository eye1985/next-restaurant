import DaySelector from "@/components/reservation/day-selector";
import { ChangeEvent, Dispatch, FormEvent, useContext, useState } from "react";
import classes from "./reservation-form.module.css";
import NumberSelector from "@/components/reservation/number-selector";
import { SelectSingleEventHandler } from "react-day-picker";
import Modal from "react-modal";
import dayjs from "dayjs";
import { ReservationContext } from "@/context/reservation-context-provider";
import errorClasses from "@/styles/utils/error.module.css";

interface ReservationFormProps {
    submitReservationHandler: () => void;
    setGuests: Dispatch<number>;
    guests: number;
    email: string;
    setEmail: Dispatch<string>;
    guestName: string;
    setName: Dispatch<string>;
    phone: number | string;
    setPhone: Dispatch<number>;
}

function ReservationForm(props: ReservationFormProps) {
    const [hasError, setHasError] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const {
        selectedTime,
        setSelectedTime,
        selectedDay,
        setSelectedDay,
        setTimeError,
    } = useContext(ReservationContext);

    const selectGuestHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        props.setGuests(parseInt(event.target.value));
    };

    const radioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    };

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

        if (!selectedTime) {
            setTimeError(true);
            return;
        }

        if (!props.email) {
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
            <form
                className={classes.reservationForm}
                onSubmit={submitFormHandler}
            >
                <NumberSelector
                    onChange={selectGuestHandler}
                    guests={props.guests}
                />

                <DaySelector
                    selected={selectedDay}
                    setSelected={setSelectedDay as SelectSingleEventHandler}
                    radioChangeHandler={radioChangeHandler}
                />

                <div className={classes.formControl}>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        type="email"
                        value={props.email}
                        onChange={(event) => {
                            props.setEmail(event.target.value);
                        }}
                        placeholder="youremail@provider.com"
                    />
                    {hasError ? (
                        <p className={errorClasses.errorText}>
                            Please input a correct e-mail address
                        </p>
                    ) : null}
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={props.guestName}
                        onChange={(event) => {
                            props.setName(event.target.value);
                        }}
                    />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        id="phone"
                        type="number"
                        placeholder="99 99 99 99"
                        value={props.phone}
                        onChange={(event) => {
                            props.setPhone(parseInt(event.target.value));
                        }}
                    />
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
                    The table will be reserved for {props.guestName}. (
                    {props.phone})
                </p>

                <p>
                    Reserve for {props.guests} person at{" "}
                    <time>
                        {dayjs(selectedTime).format("DD.MM.YYYY HH:mm")}
                    </time>
                </p>

                <div>
                    <button onClick={submitHandler}>Confirm</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </Modal>
        </>
    );
}

export default ReservationForm;
