import Button from "@/components/form/button";
import { FormEvent, MouseEvent } from "react";
import { ReservationEditable } from "@/pages/admin";
import classes from "./reservation-item-form.module.css";
import { BsFillPeopleFill } from "react-icons/bs";
import {formatDate} from "@/utils/date";

interface ReservationItemFormProps {
    submitHandler: (event: FormEvent) => void;
    reservation: ReservationEditable;
    toggleEditHandler: (event: MouseEvent) => void;
    deleteModalHandler: (event: MouseEvent) => void;
    deleteHandler: (event: MouseEvent) => void;
}

function ReservationItemForm(props: ReservationItemFormProps) {
    const {
        submitHandler,
        reservation,
        toggleEditHandler,
        deleteModalHandler,
    } = props;
    return (
        <form onSubmit={submitHandler} data-id={reservation._id}>
            <div className={classes.reservationFormContainer}>
                <div className={classes.reservationFormGrid}>
                    <div>
                        <p className={classes.textRow}>
                            <strong>Name</strong>
                            <span>{reservation.name}</span>
                        </p>

                        <p className={classes.textRow}>
                            <strong>Phone</strong>
                            <span>{reservation.phone}</span>
                        </p>

                        <p className={classes.textRow}>
                            <strong>E-mail</strong>
                            <span>{reservation.email}</span>
                        </p>

                        {reservation.isEdit ? (
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        ) : null}
                    </div>
                    <div className={classes.timeContent}>
                        <p
                            className={`${classes.textRow} ${classes.importantRow}`}
                        >
                            <strong>Reserved for</strong>

                            <span className={classes.oneLine}>
                                <time>
                                    {formatDate(reservation.time, "DD.MM.YYYY")}{" "}
                                    - {formatDate(reservation.time, "HH:mm")}
                                </time>
                                <span>
                                    <span className={classes.iconAndNumber} title={`${reservation.totalGuests} guests`}>
                                        <BsFillPeopleFill />
                                        {reservation.totalGuests}{" "}
                                    </span>
                                </span>
                            </span>
                        </p>

                        <p
                            className={`${classes.textRow} ${classes.notImportantRow}`}
                        >
                            <strong>Registered at</strong>
                            <time>
                                {formatDate(reservation.timeOfReservation,"DD.MM.YYYY")}{" "}
                                -{" "}
                                {formatDate(reservation.timeOfReservation, "HH:mm")}
                            </time>
                        </p>
                    </div>
                </div>
            </div>

            {reservation.isEdit ? (
                <div>
                    <Button type="submit">Submit change</Button>

                    <Button
                        type="button"
                        data-enable="false"
                        onClick={toggleEditHandler}
                        data-id={reservation._id}
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <div className={classes.buttonContainer}>
                    {/*<Button*/}
                    {/*    type="button"*/}
                    {/*    onClick={toggleEditHandler}*/}
                    {/*    data-enable="true"*/}
                    {/*    data-id={reservation._id}*/}
                    {/*>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}

                    <Button
                        type="button"
                        onClick={deleteModalHandler}
                        data-id={reservation._id}
                        danger
                    >
                        Delete
                    </Button>
                </div>
            )}
        </form>
    );
}

export default ReservationItemForm;
