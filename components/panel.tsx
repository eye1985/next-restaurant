import {WithChildren} from "@/interfaces/component-interfaces";
import classes from "./panel.module.css";

function Panel(props:WithChildren){

    return <div className={classes.panel}>{
        props.children
    }</div>
}

export default Panel;