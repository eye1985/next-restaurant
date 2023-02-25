import {ReactNode} from "react";
import classes from "./reservation-item.module.css";

interface ReservationItemProps {
    children:ReactNode | ReactNode[]
}
function ReservationItem(props:ReservationItemProps){
    return (
        <div className={classes.reservationItem}>
            {props.children}
        </div>
    )
}

export default ReservationItem;