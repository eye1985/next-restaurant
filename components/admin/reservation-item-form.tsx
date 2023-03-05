import Button from "@/components/form/button";
import { MouseEvent } from "react";
import classes from "./reservation-item-form.module.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import {ReservationSerialized} from "@/interfaces/reservation";
import SubmitButtonContainer from "@/components/form/submit-button-container";

interface ReservationItemFormProps {
    reservation: ReservationSerialized;
    deleteModalHandler: (event: MouseEvent) => void;
    deleteHandler: (event: MouseEvent) => void;
}

function ReservationItemForm(props: ReservationItemFormProps) {
    const { reservation, deleteModalHandler } = props;
    return (
        <form data-id={reservation._id}>
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
                                    <span
                                        className={classes.iconAndNumber}
                                        title={`${reservation.totalGuests} guests`}
                                    >
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
                                {formatDate(
                                    reservation.timeOfReservation,
                                    "DD.MM.YYYY"
                                )}{" "}
                                -{" "}
                                {formatDate(
                                    reservation.timeOfReservation,
                                    "HH:mm"
                                )}
                            </time>
                        </p>
                    </div>
                </div>
            </div>

            <SubmitButtonContainer justify="space-between" marginTop="20">
                <Button renderComponent={(btnClass)=>(
                    <Link className={`${btnClass}`} href={`/admin/edit/${reservation._id}`} title="Edit">
                        Edit
                    </Link>
                )} />

                <Button
                    type="button"
                    onClick={deleteModalHandler}
                    data-id={reservation._id}
                    danger
                >
                    Delete
                </Button>
            </SubmitButtonContainer>
        </form>
    );
}

export default ReservationItemForm;
