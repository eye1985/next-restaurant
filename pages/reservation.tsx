import Head from "next/head";

import Layout from "@/layout/layout";
import HeaderTitle from "@/components/header-title";
import ReservationForm from "@/components/reservation/reservation-form";
import { useContext, useEffect, useState } from "react";
import { ReservationBody } from "@/pages/api/reservation";
import { ReservationContext } from "@/context/reservation-context-provider";

interface ReservationProps {}

function Reservation(props: ReservationProps) {
    const [email, setEmail] = useState("");
    const [guestNumber, setGuestNumber] = useState(2);
    const [guestName, setGuestName] = useState("");
    const [guestPhone, setGuestPhone] = useState<number | string>("");

    const { selectedTime } = useContext(ReservationContext);

    useEffect(() => {
        console.log(11111);

        fetch("/api/reservation", {
            method: "get",
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    const submitReservationHandler = async () => {
        try {
            const reservationBody: ReservationBody = {
                email,
                phone: guestPhone as number,
                name: guestName,
                time: selectedTime,
            };

            const response = await fetch("/api/reservation", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationBody),
            });

            if (!response.ok) {
                throw new Error("Could not reserve a table");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Head>
                <title>Reservation</title>
                <meta
                    name="description"
                    content="Reservation for Bao restaurant"
                />
            </Head>
            <Layout>
                <HeaderTitle>Reservation</HeaderTitle>
                <main>
                    <ReservationForm
                        submitReservationHandler={submitReservationHandler}
                        email={email}
                        setEmail={setEmail}
                        guests={guestNumber}
                        setGuests={setGuestNumber}
                        guestName={guestName}
                        setName={setGuestName}
                        phone={guestPhone}
                        setPhone={setGuestPhone}
                    />
                </main>
            </Layout>
        </>
    );
}

export default Reservation;
