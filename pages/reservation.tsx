import Head from "next/head";

import ContainerLayout from "@/layout/containerLayout";
import HeaderTitle from "@/components/header-title";
import ReservationForm from "@/components/reservation/reservation-form";
import {useContext} from "react";
import {ReservationContext} from "@/context/reservation-context-provider";
import {ZodError} from "zod";

function Reservation() {
    const {selectedTime, phone, fullName, email, totalGuests} =
        useContext(ReservationContext);

    const submitReservationHandler = async () => {
        try {
            const reservationBody = {
                email,
                phone: phone ? phone : 0,
                name: fullName,
                totalGuests,
                time: new Date(selectedTime),
                timeOfReservation: new Date(),
            };

            const response = await fetch("/api/reservation", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationBody),
            });

            if(!response.ok){
                const {error} = await response.json();
                return error as ZodError;
            }

            return true;
        } catch (error) {
            return error as ZodError;
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
            <ContainerLayout>
                <HeaderTitle>Reservation</HeaderTitle>
                <main>
                    <ReservationForm
                        submitReservationHandler={submitReservationHandler}
                    />
                </main>
            </ContainerLayout>
        </>
    );
}

export default Reservation;
