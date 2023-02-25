import {ElementWithChildren} from "@/interfaces/component-interfaces";
import classes from "./admin-description.module.css";

function AdminDescription(props:ElementWithChildren){
    return <p className={classes.desc}>
        {props.children}
    </p>
}

export default AdminDescription;