import {ReactNode} from "react";
import classes from "./admin-layout.module.css";

interface AdminLayoutProps {
    children : ReactNode | ReactNode[];
}

function AdminLayout(props:AdminLayoutProps){
    return (
        <div className={classes.layout}>
            {props.children}
        </div>
    )
}

export default AdminLayout;