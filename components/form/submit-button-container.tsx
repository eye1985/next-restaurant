import Button from "@/components/form/button";
import { ReactElement } from "react";
import classes from "./button.module.css";

interface SubmitButtonContainerProps {
    children: ReactElement<typeof Button> | ReactElement<typeof Button>[];
    marginTop?:"no-margin" | "20";
    justify?:"center" | "space-between"
}

function SubmitButtonContainer(props: SubmitButtonContainerProps) {
    const {marginTop,justify} = props;
    let classNames = `${classes.container}`;

    if(marginTop === "no-margin"){
        classNames += ` ${classes.containerNoMargin}`
    }else if(marginTop === "20"){
        classNames += ` ${classes.marginTop20}`
    }

    if(justify === "space-between"){
        classNames += ` ${classes.spaceBetween}`
    }

    return <div className={classNames}>{props.children}</div>;
}

export default SubmitButtonContainer;
