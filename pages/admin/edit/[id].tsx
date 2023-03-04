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
import FormLabel from "@/components/form/form-elements/form-label";
import FormRow from "@/components/form/form-elements/form-row";
import FormElements from "@/components/form/form-elements/form-elements";
import SubmitButtonContainer from "@/components/form/submit-button-container";
import {useRouter} from "next/router";

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

    const router = useRouter();

    const [useLoader, setUseLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const [reservation, dispatch] = useReducer(
        reducer,
        deSerializedReservation
    );

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setUseLoader(true);
        setErrorMessage(null);

        try {
            const res = await fetch("/api/reservation", {
                method: "put",
                body: JSON.stringify(reservation),
            });

            if (!res.ok) {
                const errorObj = await res.json();
                setErrorMessage(errorObj.message);
                setUseLoader(false);
                console.error(errorObj.error);
                return;
            }

            await router.push("/admin");
        } catch (error) {
            setErrorMessage("Some unexpected error occurred");
        }

        setUseLoader(false);
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

                            <FormElements>
                                <FormRow>
                                    <FormLabel htmlFor="email">
                                        E-mail
                                    </FormLabel>
                                    <FormInput
                                        id="email"
                                        type="text"
                                        value={reservation.email}
                                        onChange={(event) => {
                                            dispatch({
                                                type: ReservationAction.UPDATE_EMAIL,
                                                payload: event.target.value,
                                            });
                                        }}
                                    />
                                </FormRow>

                                <FormRow>
                                    <FormLabel htmlFor="fullName">
                                        Name
                                    </FormLabel>
                                    <FormInput
                                        id="fullName"
                                        type="text"
                                        value={reservation.name}
                                        onChange={(event) => {
                                            dispatch({
                                                type: ReservationAction.UPDATE_NAME,
                                                payload: event.target.value,
                                            });
                                        }}
                                    />
                                </FormRow>

                                <FormRow>
                                    <FormLabel htmlFor="phone">Phone</FormLabel>
                                    <FormInput
                                        id="phone"
                                        type="number"
                                        value={reservation.phone}
                                        onChange={(event) => {
                                            dispatch({
                                                type: ReservationAction.UPDATE_PHONE,
                                                payload: parseInt(
                                                    event.target.value
                                                ),
                                            });
                                        }}
                                    />
                                </FormRow>

                                <FormRow>
                                    <FormLabel htmlFor="guests">
                                        Guests
                                    </FormLabel>
                                    <FormInput
                                        id="guests"
                                        type="number"
                                        value={reservation.totalGuests}
                                        onChange={(event) => {
                                            dispatch({
                                                type: ReservationAction.UPDATE_GUESTS,
                                                payload: parseInt(
                                                    event.target.value
                                                ),
                                            });
                                        }}
                                    />
                                </FormRow>
                            </FormElements>

                            {errorMessage ? (
                                <NotificationBar message={errorMessage} />
                            ) : null}

                            <SubmitButtonContainer>
                                <Button loader={useLoader} primary>Edit</Button>
                                <Button
                                    renderComponent={(btnClass) => (
                                        <Link
                                            className={`${btnClass}`}
                                            href="/admin"
                                        >
                                            Cancel
                                        </Link>
                                    )}
                                />
                            </SubmitButtonContainer>
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
                error: JSON.stringify(errorObj),
            },
        };
    }

    const [reservation] = await getReservation(client, id as string);
    await client.close();

    if (!reservation) {
        return {
            notFound: true,
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
