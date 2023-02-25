import classes from "@/components/form/form-elements/form-elements.module.css";
import {ReactNode} from "react";

interface WithReactChildren {
    children: ReactNode | ReactNode[];
}

function FormRow(props:WithReactChildren) {
    return <div className={classes.formRow}>
        {props.children}
    </div>
}

export default FormRow;