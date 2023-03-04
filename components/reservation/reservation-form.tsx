import DaySelector from "@/components/reservation/day-selector";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import classes from "./reservation-form.module.css";
import NumberSelector from "@/components/reservation/number-selector";
import Modal from "react-modal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ReservationContext } from "@/context/reservation-context-provider";
import reactModalClasses from "@/styles/react-modal.module.css";
import Button from "@/components/form/button";
import FormInput from "@/components/form/form-elements/form-input";
import FormLabel from "@/components/form/form-elements/form-label";
import FormRow from "@/components/form/form-elements/form-row";
import FormElements from "@/components/form/form-elements/form-elements";
import { ZodError } from "zod";
import FormErrorLabel from "@/components/form/form-elements/form-error-label";
import CenterAlign from "@/layout/center-align";
import spacingClasses from "@/styles/utils/spacing.module.css";
import { formatDate } from "@/utils/date";
import Panel from "@/components/panel";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ReservationFormProps {
    submitReservationHandler: () => Promise<boolean | ZodError>;
}

function ReservationForm(props: ReservationFormProps) {
    const [emailError, setEmailError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [displayForm, setDisplayForm] = useState(true);
    const [confirmLoader, setConfirmLoader] = useState(false);

    const {
        selectedTime,
        setSelectedTime,
        selectedDay,
        setSelectedDay,
        setTimeError,
        setTotalGuests,
        setPhoneNumber,
        setFullName,
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

        setEmailError("");
        setTimeError(false); // TODO refactor this?
        setFullNameError("");
        setPhoneError("");

        if (!selectedTime) {
            setTimeError(true);
        }

        if (!email) {
            setEmailError("Please input a correct e-mail address");
        }

        if (!fullName) {
            setFullNameError("Please input your name");
        }

        if (!phone) {
            setPhoneError("Please input your phone number");
        }

        if (!email || !phone || !fullName || !selectedTime) {
            return;
        }

        openModal();
    };

    const submitHandler = async () => {
        setConfirmLoader(true);
        const res = await props.submitReservationHandler();
        setConfirmLoader(false);
        if (typeof res !== "boolean") {
            closeModal();
            res.issues.forEach((issue) => {
                switch (issue.path[0]) {
                    case "email":
                        setEmailError(issue.message);
                        break;
                    case "name":
                        setFullNameError(issue.message);
                        break;
                    case "phone":
                        setPhoneError(issue.message);
                        break;
                    default:
                        //TODO add global error message
                        console.log(issue.message);
                        break;
                }
            });

            return;
        }
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
                <Panel>
                    <form
                        onSubmit={submitFormHandler}
                    >
                        <DaySelector
                            selected={selectedDay}
                            setSelected={
                                setSelectedDay
                            }
                            radioChangeHandler={radioChangeHandler}
                        />
                        <FormElements>
                            <FormRow>
                                <FormLabel htmlFor="email">E-mail:</FormLabel>
                                <FormInput
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    placeholder="e.g youremail@provider.com"
                                />
                                {emailError ? (
                                    <FormErrorLabel message={emailError} />
                                ) : null}
                            </FormRow>

                            <FormRow>
                                <FormLabel htmlFor="name">Name:</FormLabel>
                                <FormInput
                                    id="name"
                                    type="text"
                                    placeholder="e.g John Smith"
                                    value={fullName}
                                    onChange={(event) => {
                                        setFullName(event.target.value);
                                    }}
                                />
                                {fullNameError ? (
                                    <FormErrorLabel message={fullNameError} />
                                ) : null}
                            </FormRow>

                            <FormRow>
                                <FormLabel htmlFor="phone">Phone:</FormLabel>
                                <FormInput
                                    id="phone"
                                    type="number"
                                    placeholder="e.g 99887766"
                                    value={phone ? (phone as number) : ""}
                                    onChange={(event) => {
                                        setPhoneNumber(
                                            parseInt(event.target.value)
                                        );
                                    }}
                                />
                                {phoneError ? (
                                    <FormErrorLabel message={phoneError} />
                                ) : null}
                            </FormRow>

                            <NumberSelector
                                onChange={selectGuestHandler}
                                guests={totalGuests}
                            />
                        </FormElements>

                        <div className={classes.submitContainer}>
                            <Button primary>Reserve for two hours</Button>
                        </div>
                    </form>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Confirm reservation"
                    >
                        <div className={classes.modal}>
                            <p>The table will be reserved for {fullName}.</p>

                            <p>
                                Reserve for {totalGuests} person at{" "}
                                <time>
                                    {formatDate(
                                        selectedTime,
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

                            <div className={reactModalClasses.buttonContainer}>
                                <Button onClick={submitHandler} loader={confirmLoader} primary full>
                                    Confirm
                                </Button>
                                <Button onClick={closeModal} full>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </Panel>
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
                            {formatDate(selectedTime, "DD.MM.YYYY HH:mm")}
                        </time>
                    </p>

                    <p className={spacingClasses.mb40}>
                        If you wish to cancel the reservation please contact us
                        at this phone number:
                        <br />
                        <br />
                        00-00-00-00 (Not a real number)
                    </p>

                    <CenterAlign>
                        <Button
                            primary
                            onClick={() => {
                                setDisplayForm(true);
                            }}
                        >
                            Back to reservation
                        </Button>
                    </CenterAlign>
                </div>
            )}
        </>
    );
}

export default ReservationForm;
