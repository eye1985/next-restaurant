import classes from "./grid.module.css";
import { ReactNode } from "react";

interface GridProps {
    children: ReactNode | ReactNode[];
}

function Grid(props: GridProps) {
    return <div className={classes.grid}>{props.children}</div>;
}

export default Grid;
