import Head from "next/head";

import Layout from "@/layout/layout";
import HeaderTitle from "@/components/header-title";
import ReservationForm from "@/components/reservation/reservation-form";
import {useContext, useEffect} from "react";
import {ReservationBody} from "@/pages/api/reservation";
import {ReservationContext} from "@/context/reservation-context-provider";

function Reservation() {
    const {selectedTime, phone, fullName, email, totalGuests} =
        useContext(ReservationContext);

    // useEffect(() => {
    //     try {
    //         fetch("/api/reservation", {
    //             method: "get",
    //         })
    //             .then((res) => res.json())
    //             .then((data) => console.log(data));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, []);

    const submitReservationHandler = async () => {
        try {
            const reservationBody: ReservationBody = {
                email,
                phone: phone ? phone : 0,
                name: fullName,
                totalGuests,
                time: new Date(selectedTime),
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
                    />
                </main>
            </Layout>
        </>
    );
}

export default Reservation;
