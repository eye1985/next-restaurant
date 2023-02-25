import "@/styles/globals.css";
import type { AppProps } from "next/app";
import TopBar from "@/components/top-bar";
import Footer from "@/components/footer";
import Grid from "@/layout/grid/Grid";
import ReservationContextProvider from "@/context/reservation-context-provider";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc";

const App: AppType = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <SessionProvider session={session}>
            <Head>
                <meta name="description" content="Asian bun restaurant" />
                <title>Bao</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Grid>
                <TopBar />
                <ReservationContextProvider>
                    <Component {...pageProps} />
                </ReservationContextProvider>
                <Footer />
            </Grid>
        </SessionProvider>
    );
};

export default trpc.withTRPC(App);
