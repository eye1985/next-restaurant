import classes from "./top-bar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import ContainerLayout from "@/layout/containerLayout";
import { signOut, useSession } from "next-auth/react";

function TopBar() {
    const router = useRouter();
    const { pathname } = router;

    const activeLinkClass = (href: string) => {
        if (href === pathname) {
            return classes.active;
        }
    };

    const { data: session } = useSession();

    return (
        <nav className={classes.menu}>
            <ContainerLayout>
                <ul>
                    {session ? (
                        <li>
                            <button
                                title="Log out"
                                onClick={() => {
                                    signOut();
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    ) : null}

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
                            Bao 包
                        </Link>
                    </li>
                </ul>
            </ContainerLayout>
        </nav>
    );
}

export default TopBar;
