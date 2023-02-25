import Head from "next/head";
import MenuList from "@/components/menu/menu-list";
import HeaderTitle from "@/components/header-title";
import ContainerLayout from "@/layout/containerLayout";

function Menu() {
    return (
        <>
            <Head>
                <title>Menu</title>
                <meta name="description" content="Menu for Bao restaurant" />
            </Head>

            <ContainerLayout>
                <HeaderTitle>À la carte</HeaderTitle>
                <main>
                    <MenuList />
                </main>
            </ContainerLayout>
        </>
    );
}

export default Menu;
