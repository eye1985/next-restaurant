import Head from "next/head";
import MenuList from "@/components/menu/menu-list";

function Menu() {
    return (
        <>
            <Head>
                <title>Menu</title>
                <meta name="description" content="Menu for Bao restaurant" />
            </Head>

            <h1>Menu here</h1>

            <MenuList />
        </>
    );
}

export default Menu;
