import DaySelector from "@/components/reservation/day-selector";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import classes from "./reservation-form.module.css";
import NumberSelector from "@/components/reservation/number-selector";
import { SelectSingleEventHandler } from "react-day-picker";
import Modal from "react-modal";
import dayjs from "dayjs";
import { ReservationContext } from "@/context/reservation-context-provider";
import errorClasses from "@/styles/utils/error.module.css";

interface ReservationFormProps {
    submitReservationHandler: () => void;
}

function ReservationForm(props: ReservationFormProps) {
    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasFullNameError, setHasFullNameError] = useState(false);
    const [hasPhoneError, setHasPhoneError] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [displayForm, setDisplayForm] = useState(true);

    const {
        selectedTime,
        setSelectedTime,
        selectedDay,
        setSelectedDay,
        setTimeError,
        setTotalGuests,
        setPhoneNumber,
        setFullName,
        timeError,
        phone,
        totalGuests,
        email,
        setEmail,
        fullName,
    } = useContext(ReservationContext);

    const selectGuestHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setTotalGuests(parseInt(event.target.value));
    };

    const radioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    };

    const customStyles = {
        overlay: {
            background: "hsla(0, 0%, 50%, .8)",
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 0,
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

        setHasEmailError(false);
        setTimeError(false); // TODO refactor this?
        setHasFullNameError(false);
        setHasPhoneError(false);

        if (!selectedTime) {
            setTimeError(true);
        }

        if (!email) {
            setHasEmailError(true);
        }

        if (!fullName) {
            setHasFullNameError(true);
        }

        if (!phone) {
            setHasPhoneError(true);
        }

        if (!email || !phone || !fullName || !selectedTime) {
            return;
        }

        openModal();
    };

    const submitHandler = () => {
        props.submitReservationHandler();
        setDisplayForm(false);
        setFullName("");
        setPhoneNumber(null);
        setEmail("");
        setSelectedDay(new Date());
        closeModal();
    };

    return (
        <>
            {displayForm ? (
                <>
                    <form
                        className={classes.reservationForm}
                        onSubmit={submitFormHandler}
                    >
                        <NumberSelector
                            onChange={selectGuestHandler}
                            guests={totalGuests}
                        />

                        <DaySelector
                            selected={selectedDay}
                            setSelected={
                                setSelectedDay as SelectSingleEventHandler
                            }
                            radioChangeHandler={radioChangeHandler}
                        />

                        <div className={classes.formControl}>
                            <label htmlFor="email">E-mail:</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                placeholder="youremail@provider.com"
                            />
                            {hasEmailError ? (
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
                                value={fullName}
                                onChange={(event) => {
                                    setFullName(event.target.value);
                                }}
                            />
                            {hasFullNameError ? (
                                <p className={errorClasses.errorText}>
                                    Please input your name
                                </p>
                            ) : null}
                        </div>

                        <div className={classes.formControl}>
                            <label htmlFor="phone">Phone:</label>
                            <input
                                id="phone"
                                type="number"
                                placeholder="99 99 99 99"
                                value={phone ? (phone as number) : ""}
                                onChange={(event) => {
                                    setPhoneNumber(
                                        parseInt(event.target.value)
                                    );
                                }}
                            />
                            {hasPhoneError ? (
                                <p className={errorClasses.errorText}>
                                    Please input your phone number
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
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Example Modal"
                    >
                        <div className={classes.modal}>
                            <p>The table will be reserved for {fullName}.</p>

                            <p>
                                Reserve for {totalGuests} person at{" "}
                                <time>
                                    {dayjs(selectedTime).format(
                                        "DD.MM.YYYY HH:mm"
                                    )}
                                </time>
                            </p>

                            <p>
                                If we are overbooked we will call you at this
                                number <br />
                                <a href={`tel:${phone}`} title="Phone number">
                                    {phone}
                                </a>
                            </p>

                            <div className={classes.modalButtons}>
                                <button onClick={submitHandler}>Confirm</button>
                                <button onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                </>
            ) : (
                <div className={classes.receipt}>
                    <h1>Thank you for your reservation</h1>

                    <p>
                        A table for <strong>{totalGuests}</strong> have been
                        reserved for {fullName}.
                    </p>

                    <p>
                        We will be expecting you at:
                        <br />
                        <time>
                            {dayjs(selectedTime).format("DD.MM.YYYY HH:mm")}
                        </time>
                    </p>

                    <p>
                        If you wish to cancel the reservation please contact us
                        at this phone number:
                        <br />
                        <br />
                        00-00-00-00 (Not a real number)
                    </p>
                </div>
            )}
        </>
    );
}

export default ReservationForm;
