import "@/styles/globals.css";
import type { AppProps } from "next/app";
import TopBar from "@/components/top-bar";
import Layout from "@/layout/layout";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Layout>
                <TopBar />
                <Component {...pageProps} />
            </Layout>
            <Footer />
        </>
    );
}
