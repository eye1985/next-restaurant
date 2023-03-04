import Button from "@/components/form/button";
import { ReactElement } from "react";
import classes from "./button.module.css";

interface SubmitButtonContainerProps {
    children: ReactElement<typeof Button> | ReactElement<typeof Button>[];
}

function SubmitButtonContainer(props: SubmitButtonContainerProps) {
    return <div className={classes.container}>{props.children}</div>;
}

export default SubmitButtonContainer;
