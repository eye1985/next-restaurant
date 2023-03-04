import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ContainerLayout from "@/layout/containerLayout";
import HeaderTitle from "@/components/header-title";
import Button from "@/components/form/button";
import Link from "next/link";
import { connectToDB, getReservation } from "@/lib/db";
import {
    ReservationDeSerialized,
    ReservationSerialized,
} from "@/interfaces/reservation";
import FormInput from "@/components/form/form-elements/form-input";
import { FormEvent, useReducer, useState } from "react";
import DaySelector from "@/components/reservation/day-selector";
import Panel from "@/components/panel";
import { dayjsNorway } from "@/utils/date";
import NotificationBar from "@/components/notifications/notification-bar";

interface EditReservationProps {
    message?: string;
    reservation: ReservationSerialized;
    error: unknown;
}

enum ReservationAction {
    UPDATE_EMAIL = "UPDATE_EMAIL",
    UPDATE_NAME = "UPDATE_NAME",
    UPDATE_PHONE = "UPDATE_PHONE",
    UPDATE_GUESTS = "UPDATE_GUESTS",
    UPDATE_DAY = "UPDATE_DAY",
    UPDATE_TIME = "UPDATE_TIME",
}

type Action =
    | {
          type: ReservationAction.UPDATE_NAME | ReservationAction.UPDATE_EMAIL;
          payload: string;
      }
    | {
          type:
              | ReservationAction.UPDATE_PHONE
              | ReservationAction.UPDATE_GUESTS;
          payload: number;
      }
    | {
          type: ReservationAction.UPDATE_DAY | ReservationAction.UPDATE_TIME;
          payload: Date;
      };

function reducer(state: ReservationDeSerialized, action: Action) {
    const { type, payload } = action;
    switch (type) {
        case ReservationAction.UPDATE_NAME:
            return {
                ...state,
                name: payload,
            };
        case ReservationAction.UPDATE_EMAIL:
            return {
                ...state,
                email: payload,
            };
        case ReservationAction.UPDATE_PHONE:
            return {
                ...state,
                phone: payload,
            };
        case ReservationAction.UPDATE_GUESTS:
            return {
                ...state,
                totalGuests: payload,
            };
        case ReservationAction.UPDATE_DAY:
            return {
                ...state,
                time: payload,
            };
        case ReservationAction.UPDATE_TIME:
            return {
                ...state,
                time: payload,
            };
        default:
            return state;
    }
}

function EditReservation(props: EditReservationProps) {
    const deSerializedReservation: ReservationDeSerialized = {
        ...props.reservation,
        time: dayjsNorway(props.reservation.time).toDate(),
        timeOfReservation: dayjsNorway(
            props.reservation.timeOfReservation
        ).toDate(),
    };

    const [errorMessage, setErrorMessage] = useState<null |string>(null);

    const [reservation, dispatch] = useReducer(
        reducer,
        deSerializedReservation
    );

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const res = await fetch("/api/reservation", {
                method: "put",
                body: JSON.stringify(reservation),
            });

            if(!res.ok){
                const errorObj = await res.json();
                setErrorMessage(errorObj.message);
                console.error(errorObj.error);
            }
        } catch (error) {
            setErrorMessage("Some unexpected error occurred");
        }
    };

    return (
        <>
            <Head>
                <title>Admin edit reservation</title>
            </Head>
            <ContainerLayout>
                <HeaderTitle>Edit reservation</HeaderTitle>
                <main>
                    <Panel>
                        <form onSubmit={handleSubmit}>
                            <DaySelector
                                isEdit
                                selected={reservation.time}
                                setSelected={(day) => {
                                    dispatch({
                                        type: ReservationAction.UPDATE_DAY,
                                        payload: day,
                                    });
                                }}
                                radioChangeHandler={(event) => {
                                    dispatch({
                                        type: ReservationAction.UPDATE_TIME,
                                        payload: dayjsNorway(
                                            event.target.value
                                        ).toDate(),
                                    });
                                }}
                            />

                            <FormInput
                                type="text"
                                value={reservation.email}
                                onChange={(event) => {
                                    dispatch({
                                        type: ReservationAction.UPDATE_EMAIL,
                                        payload: event.target.value,
                                    });
                                }}
                            />

                            <FormInput
                                type="text"
                                value={reservation.name}
                                onChange={(event) => {
                                    dispatch({
                                        type: ReservationAction.UPDATE_NAME,
                                        payload: event.target.value,
                                    });
                                }}
                            />

                            <FormInput
                                type="number"
                                value={reservation.phone}
                                onChange={(event) => {
                                    dispatch({
                                        type: ReservationAction.UPDATE_PHONE,
                                        payload: parseInt(event.target.value),
                                    });
                                }}
                            />

                            <FormInput
                                type="number"
                                value={reservation.totalGuests}
                                onChange={(event) => {
                                    dispatch({
                                        type: ReservationAction.UPDATE_GUESTS,
                                        payload: parseInt(event.target.value),
                                    });
                                }}
                            />

                            {errorMessage ? (
                                <NotificationBar message={errorMessage} />
                            ) : null}

                            <Button primary>Edit</Button>
                            <Link href="/admin">Cancel</Link>
                        </form>
                    </Panel>
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
