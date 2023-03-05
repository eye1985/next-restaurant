import Head from "next/head";
import ContainerLayout from "@/layout/containerLayout";
import HeaderTitle from "@/components/header-title";
import { GetServerSidePropsContext } from "next";
import { ChangeEvent, MouseEvent, useState } from "react";
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
import { ReservationSerialized } from "@/interfaces/reservation";
import { connectToDB, getAggregatedReservation } from "@/lib/db";
import ToggleButtonContainer from "@/components/form/toggle-button-container";

interface ReservationObj {
    count: number;
    date: string;
    reservation: ReservationSerialized[];
}

interface AdminProps {
    reservations: string;
    message?: string;
    error?: unknown;
}

function AdminPage(props: AdminProps) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [useLoader, setUseLoader] = useState(false);

    const reservations: ReservationObj[] = JSON.parse(props.reservations);

    //TODO refactor to reducer
    const [reservationState, setReservationState] = useState(reservations);

    const [currentReservationIndex, setCurrentReservationIndex] = useState(0);
    const [currentToDeleteReservationId, setCurrentToDeleteReservationId] =
        useState("");

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
            setUseLoader(true);
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

            setUseLoader(false);
        }

        closeModal();
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

    const renderReservationJSX = (reservations: ReservationObj[]) => {
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
                                <ToggleButtonContainer>
                                    {renderReservationJSX(reservationState)}
                                </ToggleButtonContainer>
                            </div>

                            <div>
                                <AdminSectionHeader>
                                    Reservations details
                                </AdminSectionHeader>
                                {reservationState.length > 0 &&
                                    reservationState[
                                        currentReservationIndex
                                    ].reservation.map((reservation, index) => {
                                        return (
                                            <ReservationItem
                                                key={`${reservation.time}_${index}`}
                                            >
                                                <ReservationItemForm
                                                    reservation={reservation}
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
                                    <Button
                                        loader={useLoader}
                                        onClick={deleteHandler}
                                        danger
                                        full
                                    >
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

    const [client, dbError] = await connectToDB();
    if (dbError) {
        return {
            props: {
                reservations: "[]",
                message: "Cannot connect to db",
                error: JSON.stringify(dbError),
            },
        };
    }

    const [reservations, resError] = await getAggregatedReservation(client);
    if (resError) {
        return {
            props: {
                reservations: "[]",
                message: "Failed to fetch from collection",
                error: JSON.stringify(resError),
            },
        };
    }

    return {
        props: {
            reservations: JSON.stringify(reservations),
        },
    };
}
