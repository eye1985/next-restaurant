import {ReactElement, ReactNode} from "react";
import classes from "./layout.module.css";

interface LayoutProps {
    children : ReactNode | ReactNode[]
}

function Layout(props:LayoutProps){
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

export default Layout;
