import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ContainerLayout from "@/layout/containerLayout";
import HeaderTitle from "@/components/header-title";
import Button from "@/components/form/button";
import Link from "next/link";
import { connectToDB, getReservation } from "@/lib/db";
import { ReservationSerialized } from "@/interfaces/reservation";
import FormInput from "@/components/form/form-elements/form-input";
import { useState } from "react";

interface EditReservationProps {
    message?: string;
    reservation: ReservationSerialized;
    error: unknown;
}

function EditReservation(props: EditReservationProps) {
    const [reservation, setReservation] = useState(props.reservation);

    return (
        <>
            <Head>
                <title>Admin edit reservation</title>
            </Head>
            <ContainerLayout>
                <HeaderTitle>Edit reservation</HeaderTitle>
                <main>
                    <FormInput
                        type="text"
                        value={reservation.email}
                        onChange={(event) => {
                            setReservation({
                                ...reservation,
                                email: event.target.value,
                            });
                        }}
                    />

                    <FormInput
                        type="text"
                        value={reservation.name}
                        onChange={(event) => {
                            setReservation({
                                ...reservation,
                                name: event.target.value,
                            });
                        }}
                    />

                    <FormInput
                        type="number"
                        value={reservation.phone}
                        onChange={(event) => {
                            setReservation({
                                ...reservation,
                                phone: parseInt(event.target.value),
                            });
                        }}
                    />

                    <FormInput
                        type="number"
                        value={reservation.totalGuests}
                        onChange={(event) => {
                            setReservation({
                                ...reservation,
                                totalGuests: parseInt(event.target.value),
                            });
                        }}
                    />

                    <Button primary>Edit</Button>
                    <Link href="/admin">Cancel</Link>
                </main>
            </ContainerLayout>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;

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

    const [client, errorObj] = await connectToDB();
    if (errorObj || !id) {
        return {
            props: {
                reservation: {},
                message: "Could not connect to database or no valid id",
                error: errorObj,
            },
        };
    }

    const [reservation, reservationError] = await getReservation(
        client,
        id as string
    );
    await client.close();

    if (!reservation) {
        return {
            props: {
                reservation: {},
                message: `Could not fetch ${id}`,
                error: reservationError,
            },
        };
    }

    return {
        props: {
            reservation: {
                ...reservation,
                _id: reservation._id.toString(),
                time: reservation.time.toString(),
                timeOfReservation: reservation.timeOfReservation.toString(),
            },
        },
    };
}

export default EditReservation;
