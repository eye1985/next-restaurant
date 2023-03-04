import Head from "next/head";
import ContainerLayout from "@/layout/containerLayout";
import HeaderTitle from "@/components/header-title";
import { GetServerSidePropsContext } from "next";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import Modal from "react-modal";
import ReservationItem from "@/components/admin/reservation-item";
import AdminLayout from "@/layout/admin-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ToggleButton from "@/components/form/toggleButton";
import AdminSectionHeader from "@/components/admin/admin-section-header";
import AdminDescription from "@/components/admin/admin-description";
import { cloneDeep } from "lodash";
import ReservationItemForm from "@/components/admin/reservation-item-form";
import Button from "@/components/form/button";
import reactModalClasses from "@/styles/react-modal.module.css";
import NotificationBar from "@/components/notifications/notification-bar";
import {BASE_URI} from "@/utils/uri";

interface Reservation {
    _id: string;
    name: string;
    phone: number;
    email: string;
    time: string;
    timeOfReservation: string;
    totalGuests: number;
}

interface ReservationObj {
    count: number;
    date: string;
    reservation: Reservation[];
}

export interface ReservationEditable extends Reservation {
    isEdit: boolean;
}

interface ReservationObjClient {
    count: number;
    date: string;
    reservation: ReservationEditable[];
}

interface AdminProps {
    reservations: ReservationObj[];
    message?: string;
    error?: unknown;
}

function AdminPage(props: AdminProps) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const modifiedReservations: ReservationObjClient[] = props.reservations.map(
        (reservation) => {
            return {
                count: reservation.count,
                date: reservation.date,
                reservation: reservation.reservation.map((res) => ({
                    ...res,
                    isEdit: false,
                })),
            };
        }
    );

    const [reservationState, setReservationState] =
        useState(modifiedReservations);

    const [currentReservationIndex, setCurrentReservationIndex] = useState(0);

    const [currentToDeleteReservationId, setCurrentToDeleteReservationId] =
        useState("");

    const reservationSelectRef = useRef<HTMLSelectElement>(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const deleteModalHandler = (event: MouseEvent) => {
        const id = (event.target as HTMLButtonElement).getAttribute("data-id");
        if (id) {
            setCurrentToDeleteReservationId(id);
        }
        openModal();
    };

    const deleteHandler = async () => {
        if (currentToDeleteReservationId) {
            try {
                const clonedReservationState = cloneDeep(reservationState);
                clonedReservationState[currentReservationIndex].count -= 1;
                clonedReservationState[currentReservationIndex].reservation = [
                    ...clonedReservationState[
                        currentReservationIndex
                    ].reservation.filter(
                        (reservation) =>
                            reservation._id !== currentToDeleteReservationId
                    ),
                ];
                setReservationState(clonedReservationState);

                await fetch(`/api/reservation`, {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: currentToDeleteReservationId,
                    }),
                });
            } catch (error) {
                console.log(error);
            }
        }

        closeModal();
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const id = (event.target as HTMLFormElement).getAttribute("data-id");

        if (reservationSelectRef.current) {
            fetch("/api/reservation", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    totalGuests: reservationSelectRef.current.value,
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    };

    Modal.setAppElement("#__next");

    const customStyles = {
        overlay: {
            background: "hsla(0, 0%, 50%, .8)",
            backdropFilter: "blur(2px)",
            zIndex: 2,
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

    const displayReservationHandler = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const index = event.target.getAttribute("data-index");
        if (index) {
            setCurrentReservationIndex(parseInt(index));
        }
    };

    const renderReservationJSX = (reservations: ReservationObjClient[]) => {
        return reservations.map((reservationObj, index) => {
            return (
                <ToggleButton
                    key={`${reservationObj.date}_${index}`}
                    id={`${reservationObj.date}_${index}`}
                    label={`${reservationObj.date}`}
                    name="reservations"
                    value={reservationObj.date}
                    data-index={index}
                    defaultChecked={index === 0}
                    amount={reservationObj.count}
                    onChange={displayReservationHandler}
                />
            );
        });
    };

    return (
        <>
            <Head>
                <title>Admin</title>
                <meta
                    name="description"
                    content="Administrate Bao restaurant"
                />
            </Head>
            <ContainerLayout>
                {props.message ? (
                    <NotificationBar message={props.message} />
                ) : null}
                <HeaderTitle>Admin</HeaderTitle>
                <main>
                    <AdminDescription>
                        All reservation prior to today&apos;s date are
                        automatically deleted.
                    </AdminDescription>

                    {reservationState.length === 0 ? (
                        <p>No reservations</p>
                    ) : (
                        <AdminLayout>
                            <div>
                                <div>
                                    <AdminSectionHeader>
                                        Reservation dates
                                    </AdminSectionHeader>
                                </div>
                                {renderReservationJSX(reservationState)}
                            </div>

                            <div>
                                <AdminSectionHeader>
                                    Reservations details
                                </AdminSectionHeader>
                                {reservationState.length > 0 &&
                                    reservationState[
                                        currentReservationIndex
                                    ].reservation.map((reservation) => {
                                        return (
                                            <ReservationItem
                                                key={reservation.time}
                                            >
                                                <ReservationItemForm
                                                    reservation={reservation}
                                                    submitHandler={
                                                        submitHandler
                                                    }
                                                    deleteModalHandler={
                                                        deleteModalHandler
                                                    }
                                                    deleteHandler={
                                                        deleteHandler
                                                    }
                                                />
                                            </ReservationItem>
                                        );
                                    })}
                            </div>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                shouldCloseOnOverlayClick={false}
                                contentLabel="Delete reservation"
                            >
                                <p>
                                    Are you sure you want to delete the
                                    reservation?
                                </p>

                                <div
                                    className={
                                        reactModalClasses.buttonContainer
                                    }
                                >
                                    <Button onClick={deleteHandler} danger full>
                                        Delete
                                    </Button>
                                    <Button onClick={closeModal} full>
                                        Cancel
                                    </Button>
                                </div>
                            </Modal>
                        </AdminLayout>
                    )}
                </main>
            </ContainerLayout>
        </>
    );
}

export default AdminPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let reservations: Reservation[] = [];
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    //TODO refactor this, no need to call api. Can directly access DB logic
    try {
        const response = await fetch(
            `${BASE_URI}/api/reservation?prepareInitialReservation=true`,
            {
                method: "get",
            }
        );

        if (!response.ok) {
            const error = await response.json();
            return {
                props: {
                    reservations: [],
                    message: "Could not retrieve reservations",
                    error
                },
            };
        }

        const json = await response.json();
        reservations = json.reservations;
    } catch (error) {
        return {
            props: {
                reservations: [],
                message: "Could not retrieve reservations",
                error,
            },
        };
    }

    return {
        props: {
            reservations,
        },
    };
}
