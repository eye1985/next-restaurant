import Head from "next/head";
import MenuList from "@/components/menu/menu-list";
import HeaderTitle from "@/components/header-title";
import Layout from "@/layout/layout";

function Menu() {
    return (
        <>
            <Head>
                <title>Menu</title>
                <meta name="description" content="Menu for Bao restaurant" />
            </Head>

            <Layout>
                <HeaderTitle>À la carte</HeaderTitle>
                <MenuList />
            </Layout>
        </>
    );
}

export default Menu;
