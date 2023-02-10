import "@/styles/globals.css";
import type { AppProps } from "next/app";
import TopBar from "@/components/top-bar";
import Footer from "@/components/footer";
import Grid from "@/layout/grid/Grid";
import ReservationContextProvider from "@/context/reservation-context-provider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Grid>
            <TopBar />
            <ReservationContextProvider>
                <Component {...pageProps} />
            </ReservationContextProvider>
            <Footer />
        </Grid>
    );
}
