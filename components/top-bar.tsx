import classes from "./top-bar.module.css";
import Link from "next/link";

function TopBar() {
    return (
        <nav className={classes.menu}>
            <ul>
                <li>
                    <Link href="/login" title="Login">Login</Link>
                </li>

                <li>
                    <Link href="/menu" title="Goto menu">Menu</Link>
                </li>

                <li>
                    <Link href="/reservation" title="Reserve a table">Reservation</Link>
                </li>

            </ul>
        </nav>
    );
}

export default TopBar;
