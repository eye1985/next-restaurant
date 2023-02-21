import Head from "next/head";
import Layout from "@/layout/layout";
import HeaderTitle from "@/components/header-title";
import { NextPageContext } from "next";
import dayjs from "dayjs";
import { MouseEvent, useState } from "react";
import Modal from "react-modal";

interface Reservation {
    _id: string;
    name: string;
    phone: number;
    time: string;
}

interface AdminProps {
    reservations: Reservation[];
    message?: string;
    error?: unknown;
}

function AdminPage(props: AdminProps) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [reservations, setReservations] = useState(props.reservations);
    const [reservationId, setReservationId] = useState("");

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const deleteModalHandler = (event: MouseEvent) => {
        const id = (event.target as HTMLButtonElement).getAttribute("data-id");
        if (id) {
            setReservationId(id);
        }
        openModal();
    };

    const deleteHandler = async () => {
        if (reservationId) {
            const res = await fetch(`/api/reservation`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: reservationId,
                }),
            });

            setReservations(
                reservations.filter(
                    (reservation) => reservation._id !== reservationId
                )
            );
        }

        closeModal();
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

    return (
        <>
            <Head>
                <title>Admin</title>
                <meta
                    name="description"
                    content="Administrate Bao restaurant"
                />
            </Head>
            <Layout>
                <HeaderTitle>Admin</HeaderTitle>
                <main>
                    {reservations.map((reservation) => (
                        <div key={reservation.time}>
                            <div>{reservation.name}</div>

                            <div>{reservation.phone}</div>

                            <time>
                                {dayjs(reservation.time).format(
                                    "DD.MM.YYYY HH:mm"
                                )}
                            </time>

                            <div>
                                <button>Edit</button>

                                <button
                                    onClick={deleteModalHandler}
                                    data-id={reservation._id}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {reservations.length === 0 ? <p>No reservations</p> : null}

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Delete reservation"
                    >
                        <p>Are you sure you want to delete the reservation?</p>

                        <button onClick={deleteHandler}>Delete</button>
                        <button onClick={closeModal}>Cancel</button>
                    </Modal>
                </main>
            </Layout>
        </>
    );
}

export default AdminPage;

export async function getServerSideProps(context: NextPageContext) {
    const uri = process.env.BASE_ORIGIN;
    let reservations: Reservation[] = [];

    try {
        const response = await fetch(`${uri}/api/reservation`, {
            method: "get",
        });

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
