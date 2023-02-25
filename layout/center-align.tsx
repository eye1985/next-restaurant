import { ReactNode } from "react";
import classes from "./center-align.module.css";

function CenterAlign({ children }: { children: ReactNode | ReactNode[] }) {
    return <div className={classes.verticalAlign}>{children}</div>;
}

export default CenterAlign;
