import Button from "@/components/form/button";
import { MouseEvent } from "react";
import classes from "./reservation-item-form.module.css";
import { BsFillPeopleFill } from "react-icons/bs";
import Link from "next/link";
import { ReservationSerialized } from "@/interfaces/reservation";
import SubmitButtonContainer from "@/components/form/submit-button-container";
import dayjs from "dayjs";
import {toDateFromFormattedDate} from "@/utils/date";

interface ReservationItemFormProps {
    reservation: ReservationSerialized;
    deleteModalHandler: (reservationId:string,event: MouseEvent) => void;
    deleteHandler: (event: MouseEvent) => void;
}

function ReservationItemForm(props: ReservationItemFormProps) {
    const { reservation, deleteModalHandler } = props;

    const localTimeDayjs = toDateFromFormattedDate(reservation.formattedDate);

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
                                    {localTimeDayjs.format(
                                        "DD.MM.YYYY"
                                    )}{" "}
                                    - {localTimeDayjs.format("HH:mm")}
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
                                {dayjs(reservation.timeOfReservation).format(
                                    "DD.MM.YYYY"
                                )}{" "}
                                -{" "}
                                {dayjs(reservation.timeOfReservation).format(
                                    "HH:mm"
                                )}
                            </time>
                        </p>
                    </div>
                </div>
            </div>

            <SubmitButtonContainer justify="space-between" marginTop="20">
                <Button
                    renderComponent={(btnClass) => (
                        <Link
                            className={`${btnClass}`}
                            href={`/admin/edit/${reservation._id}`}
                            title="Edit"
                        >
                            Edit
                        </Link>
                    )}
                />

                <Button
                    type="button"
                    onClick={deleteModalHandler.bind(null, reservation._id)}
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
