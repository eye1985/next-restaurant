import classes from "./top-bar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/layout/layout";

function TopBar() {
    const router = useRouter();
    const { pathname } = router;

    const activeLinkClass = (href: string) => {
        if (href === pathname) {
            return classes.active;
        }
    };

    return (
        <nav className={classes.menu}>
            <Layout>
                <ul>
                    {/*<li>*/}
                    {/*    <Link*/}
                    {/*        className={activeLinkClass("/login")}*/}
                    {/*        href="/login"*/}
                    {/*        title="Login"*/}
                    {/*    >*/}
                    {/*        Login*/}
                    {/*    </Link>*/}
                    {/*</li>*/}

                    <li>
                        <Link
                            className={activeLinkClass("/menu")}
                            href="/menu"
                            title="Goto menu"
                        >
                            Menu
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={activeLinkClass("/reservation")}
                            href="/reservation"
                            title="Reserve a table"
                        >
                            Reservation
                        </Link>
                    </li>

                    <li className={classes.home}>
                        <Link href="/" title="home">
                            Restaurant 包
                        </Link>
                    </li>
                </ul>
            </Layout>
        </nav>
    );
}

export default TopBar;
