import Head from "next/head";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

export default function Home() {
    return (
        <>
            <Head>
                <title>Bao</title>
                <meta name="description" content="Asiatisk mat" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Hero title="Bao 包" />
            <main>Main content here</main>
            <Footer />
        </>
    );
}
