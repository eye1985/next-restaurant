import {ReactNode} from "react";
import classes from "./container-layout.module.css";

interface LayoutProps {
    children : ReactNode | ReactNode[]
}

function ContainerLayout(props:LayoutProps){
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

export default ContainerLayout;
