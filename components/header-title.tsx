import {ReactNode} from "react";
import classes from "./header-title.module.css";

interface HeaderTitleProps {
    children: ReactNode | ReactNode[];
    center?:boolean;
}

function HeaderTitle(props: HeaderTitleProps) {
    const {children, center} = props;

    let extraClass="";
    if(center){
        extraClass=`${classes.center}`;
    }

    return <h1 className={`${classes.headerTitle} ${extraClass}`}>{children}</h1>;
}

export default HeaderTitle;
