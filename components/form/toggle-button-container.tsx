import { ReactElement } from "react";
import ToggleButton from "@/components/form/toggleButton";
import classes from "./toggleButton.module.css";

interface ToggleButtonContainerProps {
    children: ReactElement<typeof ToggleButton>[];
}

function ToggleButtonContainer(props: ToggleButtonContainerProps) {
    return <div className={classes.container}>{props.children}</div>;
}

export default ToggleButtonContainer;
