import {WithChildren} from "@/interfaces/component-interfaces";
import classes from "./admin-description.module.css";

function AdminDescription(props:WithChildren){
    return <p className={classes.desc}>
        {props.children}
    </p>
}

export default AdminDescription;