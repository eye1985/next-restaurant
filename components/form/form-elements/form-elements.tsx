import { ReactNode } from "react";
import classes from "./form-elements.module.css";

interface WithReactChildren {
    children: ReactNode | ReactNode[];
}

function FormElements(props: WithReactChildren) {
    return <div className={classes.formControl}>{props.children}</div>;
}

export default FormElements;
