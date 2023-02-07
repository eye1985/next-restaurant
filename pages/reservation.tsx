import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import dayjs from "dayjs";

import Layout from "@/layout/layout";
import HeaderTitle from "@/components/header-title";
import ReservationForm from "@/components/reservation/reservation-form";

interface ReservationProps {}

function Reservation(props: ReservationProps) {
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
                    <ReservationForm />
                </main>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const props: ReservationProps = {};

    console.log(dayjs().format("DD-MM-YYYY"));

    return {
        props,
    };
}

export default Reservation;
