import Head from "next/head";
import { GetServerSidePropsContext } from "next";

import Layout from "@/layout/layout";
import HeaderTitle from "@/components/header-title";
import ReservationForm from "@/components/reservation/reservation-form";

interface ReservationProps {}

function Reservation(props: ReservationProps) {
    const submitReservationHandler = async () => {
        try{
            const response = await fetch("/api/reservation", {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    date: new Date().toISOString(),
                    persons:1
                })
            });

            const json = await response.json();

            console.log(json)
        }catch (error){
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const props: ReservationProps = {};
    // const db = await connect();
    //
    // const collection = await (db as Db).collection("reservation");

    // console.log(dayjs().format("DD-MM-YYYY"));

    return {
        props: {
            test: "test",
        },
    };
}

export default Reservation;
