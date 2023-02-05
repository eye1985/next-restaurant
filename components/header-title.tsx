import {ReactNode} from "react";
import classes from "./header-title.module.css";

interface HeaderTitleProps {
    children: ReactNode | ReactNode[]
}

function HeaderTitle(props: HeaderTitleProps) {
    const {children} = props;

    return <h1 className={classes.headerTitle}>{children}</h1>;
}

export default HeaderTitle;
